---
layout: post
show_date: true
title: "理解CUDA及其安装"
date: 2023-02-27
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

CUDA configuartion is one of many intracable problems during my study. And this time, when I performed experiment for my master theis, I was stuck into this disgusting problem again. In this blog, I would like to clarify related concepts by introduce how to install nvidia cuda on ubuntu[^1].\

TL;DR: Always mind compatibility. Follow official instruction. Reinstall when you meet problems.

# Core Concept
>CUDA (or Compute Unified Device Architecture) is a parallel computing platform and application programming interface (API) that allows software to use certain types of graphics processing units (GPUs) for general purpose processing, an approach called general-purpose computing on GPUs (GPGPU) - Wikipedia

Compatibility

# Pre-installation
## Verify the system has a CUDA-capable GPU.
```
lspci | grep -i nvidia
```

```
1a:00.0 VGA compatible controller: NVIDIA Corporation GA102 [GeForce RTX 3090] (rev a1)
1a:00.1 Audio device: NVIDIA Corporation GA102 High Definition Audio Controller (rev a1)
```

If your graphics card is from NVIDIA and it is listed in https://developer.nvidia.com/cuda-gpus, your GPU is CUDA-capable.

The Release Notes for the CUDA Toolkit also contain a list of supported products.

## Verify You Have a Supported Version of Linux
```
uname -m && cat /etc/*release
```
You should see output similar to the following
```
x86_64
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=22.10
DISTRIB_CODENAME=kinetic
DISTRIB_DESCRIPTION="Ubuntu 22.10"
PRETTY_NAME="Ubuntu 22.10"

```

## Verify the System Has gcc Installed
```
gcc --version
```

## Verify the System has the Correct Kernel Headers and Development Packages Installed
 it is best to manually ensure the correct version of the kernel headers and development packages are installed prior to installing the CUDA Drivers, as well as whenever you change the kernel version.
For Ubuntu
```
sudo apt-get install linux-headers-$(uname -r)
```

```
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
linux-headers-5.19.0-35-generic is already the newest version (5.19.0-35.36).
linux-headers-5.19.0-35-generic set to manually installed.
0 upgraded, 0 newly installed, 0 to remove and 33 not upgraded.
```

# Installation
sudo apt-key del 7fa2af80

```
The following packages have unmet dependencies:
 nvidia-kernel-common-515 : Conflicts: nvidia-kernel-common
 nvidia-kernel-common-530 : Conflicts: nvidia-kernel-common
E: Error, pkgProblemResolver::Resolve generated breaks, this may be caused by held packages.
```

Try to update nvidia-kernel[^2]
```
sudo apt list --installed | grep nvidia-kernel
sudo apt-get install nvidia-kernel-common-515
sudo apt-get install nvidia-kernel-source-515
sudo apt-get -y install cuda
```

```
wget https://developer.download.nvidia.com/compute/cuda/11.7.0/local_installers/cuda_11.7.0_515.43.04_linux.runsudo sh cuda_11.7.0_515.43.04_linux.run
```

```
Failed to verify gcc version. See log at /var/log/cuda-installer.log for details.
```



# Post-Installation
## Environment setup

# More

If your ubuntu system is on wsl, there are some differences. 

[^1]: https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html
[^2]: https://forums.developer.nvidia.com/t/driver-in-unknown-state-after-attempting-to-install-cuda-ubuntu-22-04/217106/2