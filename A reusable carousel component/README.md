# Reusable carousel component by sawthet

This js file create a carousel component in which you can add **as many slides as you want.**

All you need to do is to mark up your html element with these certain class names.

## The format is as below.

```
<div class="carousel">
	<div class="slider slider--dots slider--autoslide">
		<div class="slide">
			create first slide
		</div>
		<div class="slide">
			create second slide
		</div>
		<div class="slide">
        create third slide
		</div>
    </div>
		<button class="carousel__btn--left">create your left button</button>
		<button class="carousel__btn--right">create your right botton</button>
</div>
```

**To specify width and height of class-name-caruosel element is REQUIRED.**
**Other styles to this element is OPTIONAL.**

---

### Optional class names

Class names [slider--dots] and [slider--autoslide] are optional.

##### slider--autoslide

Add this class name if you want to change to next slide after every 5 seconds. You can change the interval.Check customization section.

##### slider--dots

Add this class name if you want to add dots which can track the current slide. The dots can also be clicked to change the slide directly to the clicked one.

---

## Customization the effect

All these customization are also optional.

### To change the transition time

Add a special data attribute to slider element like this [data-trans-sec='1'] which default value is 0.5 second.

### To change the interval for autoslide

Add a special data attribute to the slider element like this [data-interval='8'].
This change the interval to [8s] from default value [5s].

### To customize styles of dots

You can also customize dots by adding special data attributes to slider element.

For dot sizes
=> [data-dot-size='10px'] // default is 7px.

For dot colors
=> [data-dot-color='red'] // default is #676767
=> [data-dot-color-active='blue'] // default is #222

For dot position from bottom of carousel
=> [data-dot-position='5%'] // default is 3%

For spaces between dots
=> [data-dot-gap='10px'] // default is 8px

---

## The complete markup format with all possible customizations will be as below.

```
<div class="carousel">
    <div class="slider slider--dots slider--autoslide"
    data-trans-sec='1'
    data-interval='8'
    data-dot-color='red'
    data-dot-color-active='blue'
    data-dot-size='10px'
    data-dot-position='5%'
    data-dot-gap='10px'>
        <div class="slide">
            create first slide
        </div>
        <div class="slide">
            create second slide
        </div>
        <div class="slide">
            create third slide
        </div>
    </div>
    <button class="carousel__btn--left">create your left button</button>
    <button class="carousel__btn--right">create your right botton</button>
</div>
```
