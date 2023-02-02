# Command the Command Line

Educational material covering usage and administration of Unix-like systems.

## Build Instructions

Building the course content requires [Node.js](https://nodejs.org/en/) and [GNU
Make](https://www.gnu.org/software/make/).

To install dependencies and build the content:

    $ make

To deploy the content to the web (requires permissions to write to the
"upstream" repository):

    $ make deploy

To build and deploy the Vagrant "box":

    $ make deploy-box

Note that this target relies on the Amazon AWS CLI (`aws`), and it will operate
with the current user's default profile. This can be controlled at deploy time
via the `AWS_DEFAULT_PROFILE` environment variable, as in:

    $ AWS_DEFAULT_PROFILE=bocoup make deploy-box

## License

- All content contained within the `src/material/` directory is licensed under
  the Creative Commons Attribution-ShareAlike 4.0 International License; see
  LICENSE-CC-BY-SA
- All code contained with the `src/` directory is copyright 2023 Mike Pennisi,
  licensed under the GNU General Public License v3.0; see LICENSE-GPL
