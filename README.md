# formater-geotiff-visualizer-vjs
A webcomponent to visualize your geotiff file

@inprogress

![Screenshot](/images/screenshot1.png)



## Use
In the body page add the component and the script like this:

```
<geotiff-visualizer jsonurl='url_to_json' lang="en"></geotiff-visualizer>
<script src="https://cdn.rawgit.com/terresolide/formater-geotiff-visualizer-vjs/0.0.1/dist/formater-geotiff-visualizer-vjs.js"></script>
```
Where 
 * `jsonurl` is a json file describing your geotiff list, REQUIRED (specifications @inprogress)
 * `lang` is the code language `fr` or `en` (optionnal)
 * `attribution` is a boolean to display or hide the attribution line  (optionnal)

2 optional props specific to our app:
 * `token` 
 * `dirurl` is the dir url where are listed subswath 