# NiceFab Script

This script allows users an easy copy/paste method to include an interactive Sketchfab view into their Nicepage projects. The annotations of the Sketchfab view can be connected to either Nicepage's internal modals that show over the whole page, or custom iframe modals that display only within the confines of the Sketchfab view.

Use this script to create nested Sketchfab views (user clicks annotation, calling a popup with another sketchfab view inside of it), and more!

To use this script:
```
1.  Create HTML element in Nicepage
2.  Copy and paste the contents of NiceFab_Script.html into the HTML element
3a. If using Nicepage's modals, edit the elements of annotation_modals to contain the ID's of the desired modals to be called.
3b. Else, if using custom modals, edit the elements of annotation_pages to contain the local page links of the desired sources for the popup iframes.
4.  Profit!
```

Currently it is not set up to use both custom modals and nicepage's modals at the same time, though this script may be updated in the future to add further functionality.

(Video coming in the future)
