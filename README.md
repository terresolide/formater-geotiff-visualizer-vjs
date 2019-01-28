# formater-geotiff-visualizer-vjs
A webcomponent to visualize your geotiff file


![Screenshot](/images/screenshot2.png)



## Use
In the body page add the component and the script like this:

### To display a list of geotiff
```html
<geotiff-visualizer jsonurl="url_to_json" lang="en" band="2"></geotiff-visualizer>
<script src="https://url_to/formater-geotiff-visualizer-vjs.js"></script>
```
Where 
 * `jsonurl` is a json file describing your geotiff list,  (specifications @inprogress)  
 * `band` integer beginning by 1. The band to display first (optional)
 * `lang` is the code language `fr` or `en` (optionnal)
 * `attribution` is a boolean to display or hide the attribution line  (optionnal)

 ### To display the interface with a file input area
 ```html
<geotiff-visualizer max-files="3" band="2"></geotiff-visualizer>
<script src="https://url_to/formater-geotiff-visualizer-vjs.js"></script>
```

Where 
 * `max-files` the maximum number of files the user can load (optional)
 * `band` integer beginning by 1. The band to display first (optional)
 * `lang` is the code language `fr` or `en` (optionnal)
 * `attribution` is a boolean to display or hide the attribution line  (optionnal)
 
### 2 optional props specific to our app:
#### Before publication
 * `token` 
 * `dirurl` is the dir url where are listed subswath 
#### After publication
 * `zenodo` the record identifier in zenodo plateform
