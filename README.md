# Notebook Classroom

Notebook classroom is a slim react app, that can be added to Jupyter notebooks 
to publish them as a web application (e.g. on Github pages).

It is called *classroom* as it is intented to be used with lecture content 
stored in Jupyter notebooks, that are compiled to reveal.js slides for 
presentation, HTML for reference and can be loaded in binder to 
be used by your students.

[mmaelicke](https://github.com/mmaelicke) has a sample lecture template that can be 
used to generate new lectures:

<a href="https://github.com/mmaelicke/sample-lecture/generate" target="_blank">generate my own lecture</a>

## Note

This is a work in progress application and not finished yet.
It is still under construction and might change in the future.

## Use

Using this app is kind of complicated in the current state.
We make some effort to improve the usability.

The first step is to create the full lecture content using 
[Jupyter Notebooks](https://jupyter.org). If you want to use presentations 
as well, don't forget to set the slide metadata. 

We will provide a [Github actions yml](https://github.com/features/actions) that 
will do most of the work for you automatically. Copy the [workflows/main.yml] into the ``.github/workflows`` 
folder of your repository. Alternatively, there is a [sample reposity](https://github.com/mmaelicke/sample-lecture) 
that can be used as a template repository. The steps script performs are:

1. Convert all ``*.ipynb`` files into ``.html`` and ``.slides.html`` files into a new ``./nb`` folder.

2. Downloads the latest release of this repository

3. copies the ``./nb`` folder into the application tree of notebook-classroom. 
   This is the place, where the React app will search for it

4. copies a ``index.md`` into the applications ``static`` folder. This is 
   the landing page for your notebook-classroom application and you should supply some 
   basic information for your students here.

5. copies the ``configuration.js`` into the React app. This file will be used to 
   configure notebook-classroom and you need to specify it. More info on configuration down below

6. The configured React app will be deployed to [GitHub Pages](https://pages.github.com/). You'll 
   find it at https://*your-username*.github.io/*repository-name*


## Configuration


the `configuration.js` defines the navigation. An example layout is
already prepared. You can either add new items to the navigation, 
or sort your files into the suggested one. As an example, in case 
you compiled a `introduction.ipynb` to a `introduction.html` HTML 
version and a `introduction.slides.html` presentation file, you can 
add these two entries to `configuration.js`:

```Javascript
...
navigation: [
    {
        label: "Notebooks",
        navigation: [
            label: "Introduction",
            link: "introduction.html"
        ]
    },
    {
        label: "Presentations",
        navigation: [
            label: "Introductory Slides",
            link: "introduction.slides.html"
        ]
    }
]
...
```
