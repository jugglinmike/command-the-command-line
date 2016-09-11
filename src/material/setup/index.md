---
title: Setup
layout: chapter.html
---

![Disassembled camera](camera-assembly.jpg)

"[Minolta 35mm
camera](https://www.flickr.com/photos/robert_r_gigliotti/14373883203/)" by
[Robert R Gigliotti](https://www.flickr.com/photos/robert_r_gigliotti/) is
licensed under [CC BY-NC-ND
2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)

???

In order to participate in the interactive exercises, some assembly is
required.

---

# Setup: Requirements

- A computer running Microsoft Windows, Mac OSX, or GNU/Linux. The setup
  procedure requires administrative rights on this computer.
- An Internet connection

---

# Setup: Procedure

1. Download and install VirtualBox
   - Freely available at https://www.virtualbox.org/
   - To verify: run the following command from a terminal window: `virtualbox
     --help` (this course expects version 4.3.36 or newer).
2. Download and install Vagrant
   - Freely available at https://www.vagrantup.com/
   - To verify: run the following command from a terminal window: `vagrant
     --version` (this course expects version 1.7.2 or newer).
3. Download and create the virtual environment for this course
   - Create a new directory for this course
   - Run the following commands from a terminal window:
     - `vagrant init http://boxes.bocoup.com/speaking-nix.box`
     - `vagrant up`
   - To verify: run the following command from a terminal window: `vagrant
     status` (it should report, "The VM is running.")
