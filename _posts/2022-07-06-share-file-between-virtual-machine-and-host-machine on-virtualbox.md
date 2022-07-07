---
layout: post
show_date: true
title: "Share file between virtual machine and host machine on virtualbox"
date: 2022-07-07
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: 
---

>TL;DR: Install Guest Additions, set shared folder and mount it.

## Install Guest Additions
VirtualBox Guest Additions are software which enable seamless integration between the host and guest systems. It provides features including mouse pointer integration, Drag’n’Drop functionality, shared clipboard, **shared folders** and more.

Take CentOS as an example, we can install it via two methods. Before that, we first config the environment.

```
# enable EPEL repository
$ yum -y install epel-release
# update package
$ yum -y update
# install kernel headers, develper tools and other related packages
$ yum install make gcc kernel-headers kernel-devel perl dkms bzip2
# set KERN-DIR environment variable
$ export KERN_DIR=/usr/src/kernels/$(uname -r)
```

### Command
```
# mount -r /dev/cdrom /media
# cd /media/
# ./VBoxLinuxAdditions.run 
```

### GUI
Click on Devices-Insert Guest Additions CD Image. A dialog window will pop up, click on the Run to excute it.

## Set shared folder
This process need GUI. If your system is minimal, GUI can be installed through following command.
```
$ yum groupinstall "GNOME Desktop"        [On CentOS 7]
$ yum groupinstall "Server with GUI"      [On RHEL 7]
```
Click on Devices-Shared Folders, set the folder you want to share with virtual machine and set its name.

## Mount the folder
```
$ sudo mount -t vboxsf [HOST_SHARED_FOLDER_NAME] [VIRTUAL]
```

Reference
[1]https://www.tecmint.com/install-virtualbox-guest-additions-in-centos-rhel-fedora/
[2]https://www.tecmint.com/install-gui-in-rhel-centos-7/