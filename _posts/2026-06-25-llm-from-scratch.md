---
layout: post
title: "何为自注意力机制"
date: 2026-03-15 21:00:00 +0800
tags: [变形金刚, 大模型, 注意力]
excerpt: "记录一下对自注意力机制的理解。主要是阅读《从零构建大模型》时的笔记。"
mathjax: true
---

## 引言
>对于生成一个特定的输出次元，某些输入词元比其他输入词元更重要。

NLP的一个核心问题是如何准确理解自然语言的含义。不难想到，要结合相应的语境（context）去理解。
用更专业的术语来说，就是要结合token的上下文去理解。

这自然涉及到对上下文进行编码。最暴力的做法是将所有上下文纳入到token的表示中，但这会带来新问题：
- 并不是所有上下文都对理解token的含义有帮助。也就是上下文中存在噪音。
- 实际上不可能将所有上下文纳入，否则会使计算量无限膨胀。必须选定一个窗口大小。但是窗口以外的上下文也可能对理解token的含义有帮助。也就是会遗漏上下文

注意力机制解决的是第一个问题。
传统的注意力机制中，涉及输入序列和输出序列，注意力也在两者之间，在生成输出序列的某个token时，要关注输入序列的特定token。
而自注意力机制则是关注**同一序列**的所有token。

## 如何关注 - 加权平均
> 在自注意力机制中，我们的目标是为输入序列中的每个元素$x^{(i)}$计算上下文向量$z^{(i)}$。上下文向量可以理解为一种包含了序列中所有元素信息的嵌入向量。

给定一个输入序列，第i个token向量是$x^{(i)}$。
一个朴素的思路是取输入序列中所有$x^{(i)}$的平均向量。但这样就会导致每个$z^{(i)}$都一样。因此，在计算平均向量时，还要为不同的token取不同的权重来计算**加权平均**。

权重$w^(i)$的含义是对第i个token的关注程度。越高表示越关注。考虑到$z^{(i)}$表示的是位置i的上下文，在计算$z^{(i)}$时，对第i个token的关注程度应该是最高的。很自然的做法是，以$x^{(i)}$之间的点积并归一化来作为权重。

## 可训练权重

然而，直接取固定的$x^{(i)}$来进行加权平均并不准确，因为同一个token在不同的上下文中语义显然不完全一致。
而且，向量点积用于表征的是向量之间的相似度。$x^{(i)}$之间的点积和token之间的关注程度实际上是没有必然关系的。

因此要对以下两方面继续进行优化：
- 被用来加权平均的向量。可以理解为某个token在当前位置的语义。
自注意力机制引入权重参数矩阵$W_{value}$对$x^{(i)}$进行变换，得到一个更符合要求的向量$q$。这个向量新被称作值向量。

- 加权平均时的权重。直接用值向量之间的点积会遇到与前面类似的问题。自注意力机制引入了权重参数矩阵$W_{query}$和$W_{key}$。在计算位置i对位置j的关注程度时：
  - 用$x^{(i)}$ @ $W_{query}$ 进行变换，度量位置i所期望关注的信息。这个新向量被称作查询向量$q$。
  - 用$x^{(j)}$ @ $W_{key}$ 进行变换，度量位置j所包含的信息。这个新向量被称作键向量$k$。

上述的三个矩阵$W_{query}$，$W_{key}$，$W_{value}$是在神经网络训练过程中优化的参数。

## 因果注意力
>对于许多大语言模型任务，你希望自注意力机制在预测序列中的下一个词元时仅考虑当前位置之前的词元。

从上面分析可以看到，标准的自注意力机制可以一次获取整个输入序列。在GPT等生成任务中，这显然是不可接受的。因此，在大语言模型中，处理时要屏蔽当前token之后的token。换句话说，我们希望在计算$z^{(i)}$，不关注位置i之后的token，它们对应的注意力权重则应该是0。这就是因果（掩码）注意力。

## 数学trick
### 归一化
为了保持可解释性和训练稳定性，需要对注意力权重进行归一化。自注意力机制采用了softmax和$\sqrt{d_k}$缩放的方法。
在处理因果注意力时，归一化有两种处理方式：
- 先计算注意力权重，使用softmax归一化，掩码后再次softmax归一化
- 先计算注意力权重，直接掩码，然后用softmax归一化。
显然，后者计算效率更高。

### dropout
为了避免过拟合，自注意机制训练时（且仅在训练时）会采用dropout方法，随机丢弃权重。一般会在计算注意力权重之后就应用dropout掩码。

### 一个demo
结合以上分析，可以写出一个简单的因果注意力类。
```Python
class CausalAttention(nn.Module):
    def __init__(self, d_in, d_out, context_length,
                dropout, qkv_bias=False):
        super().__init__()
        self.d_out = d_out
        self.W_query = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_key = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_value = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.dropout = nn.Dropout(dropout)
        self.register_buffer("mask", torch.tril(torch.ones(context_length, context_length), diagonal=1))

    def forward(self, x):
        b, num_tokens, d_in = x.shape
        keys = self.W_key(x)
        queries = self.W_query(x)
        values = self.W_value(x)

        attn_scores = queries @ keys.transpose(1, 2)
        attn_scores.masked_fill_(self.mask,bool()[:num_tokens, :num_tokens], -torch.inf)
        attn_weights = torch.softmax(attn_scores / keys.shape[-1]**0.5, dim=-1)

        attn_weights = self.dropout(attn_weights)
        context_vec = attn_weights @ values
        return context_vec
```

## 多头注意力
权重参数矩阵$W_{query}$，$W_{key}$，$W_{value}$本质上是对$x_{(i)}$进行变换，得到对应的线性投影。
一组权重参数矩阵可以看作是一个注意力头，用于关注输入序列的某个方面。
既然是投影，就难免存在片面性。因此为了让模型能够关注输入序列的不同方面，自注意力机制引入了多头注意力机制，也就是用多个投影。

通过使用多组权重参数矩阵，对位置i得到多个上下文向量，然后将这些上下文向量拼接在一起，
从而增加最终上下文向量的维度，从而实现更全面地表征。

```Python
class MultiHeadCausalAttention(nn.Module):
    def __init__(self, d_in, d_out, context_length,
                num_heads, dropout, qkv_bias=False):
        super().__init__()
        self.attn_heads = nn.ModuleList([
            CausalAttention(d_in, d_out, context_length,
                            dropout, qkv_bias) for _ in range(num_heads)
        ])

    def forward(self, x):
        return torch.cat([attn_head(x) for attn_head in self.attn_heads], dim=-1)
```

为了提高计算效率，更常见的做法是将多头注意力机制的计算合并在一起，也就是把多个权重参数矩阵合并成一个大的权重参数矩阵。

```Python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_in, d_out, context_length,
                num_heads, dropout, qkv_bias=False):
        super().__init__()
        self.num_heads = num_heads
        self.d_out = d_out
        self.head_dim = d_out // num_heads # 降低每个头的维度，保证最终输出维度不变
        self.W_query = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_key = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_value = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.dropout = nn.Dropout(dropout)
        self.register_buffer("mask", torch.tril(torch.ones(context_length, context_length), diagonal=1))

    def forward(self, x):
        b, num_tokens, d_in = x.shape
        keys = self.W_key(x)
        queries = self.W_query(x)
        values = self.W_value(x)

        keys = keys.view(b, num_tokens, self.num_heads, self.head_dim)
        queries = queries.view(b, num_tokens, self.num_heads, self.head_dim)
        values = values.view(b, num_tokens, self.num_heads, self.head_dim)

        keys =  keys.transpose(1, 2)
        queries = queries.transpose(1, 2)
        values = values.transpose(1, 2)

        attn_scores = queries @ keys.transpose(2, 3)
        attn_scores.masked_fill_(self.mask[:num_tokens,:num_tokens].bool(), -torch.inf)
        attn_weights = torch.softmax(attn_scores / keys.shape[-1]**0.5, dim=-1)

        attn_weights = self.dropout(attn_weights)
        context_vecs = attn_weights @ values
        return context_vecs.transpose(1, 2).contiguous().view(b,num_tokens,self.num_heads*self.d_out)
```

这里的重点是要厘清张量的形状变化：
- 输入张量x的形状是(b, num_tokens, d_in)，其中b是batch size，num_tokens是序列长度，d_in是输入向量的维度。
- 通过权重参数矩阵变换后，得到的keys、queries、values的形状是(b, num_tokens, d_out)。
- 展开最后一个维度将形状调整为(b, num_tokens, num_heads, head_dim)，其中head_dim = d_out // num_heads。
- 通过转置将num_heads维度移到第二个位置，得到(b, num_heads, num_tokens, head_dim)。便于计算注意力分数。
- 计算注意力分数后，得到的attn_weights形状是(b, num_heads, num_tokens, num_tokens)。
- 通过attn_weights与values相乘，得到的context_vecs形状是(b, num_heads, num_tokens, head_dim)。
- 最后将context_vecs转置回(b, num_tokens, num_heads, head_dim)，并将形状调整为(b, num_tokens, num_heads * head_dim)，即(b, num_tokens, d_out)。

至此，每个token的上下文向量就被计算出来了。





