# About

Notebook classroom is a slim react app, that can be added to Jupyter notebooks 
to publish them as a web application (e.g. on Github pages).

It is called *classroom* as it is intended to be used with lecture content 
stored in Jupyter notebooks, that are compiled to reveal.js slides for 
presentation, HTML for reference and can be loaded in binder to 
be used by your students.

## Note

This is a work in progress application and not finished yet.
This page will give some info about the project one day.

## Use

Using this app is kind of complicated in the current state.
Some hints will be provided on Github, until there is a proper 
release, that can be copied into the lecture repository.

The first step is to create the full lecture content using 
[Jupyter Notebooks](https://jupyter.org). Use `nbconvert` to
convert them to the desired target formats. Best practice is 
to convert them into a `./nb/` folder. 

Next, download the latest release of `notebook-classroom`. 
Then merge the two `./nb/` folders. Now the content is available, 
you just need to link the different files in the navigation of 
`notebook-classroom`. This might be some extra work, but you have 
the full control how your page will be presented to the students.


the `configuration.js` defines the navigation. An example layout is
already prepared. You can either add new items to the navigation, 
or sort your files into the suggested one. As an example, in case 
you compiled a `introduction.ipnb` to a `introduction.html` HTML 
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