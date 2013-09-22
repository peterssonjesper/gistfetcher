GistFetcher
===========

This jQuery plugin fetches and presents gists from Github. It's inspired by [Intelligist](http://srobbin.com/jquery-plugins/intelligist/), but is more lightweight and supports multiple Gists on the page.


Usage
-----

### Example 1 ###

This is probably the most simple way to use the plugin.

```html
<div id="mycode"></div>
```

```javascript
$("#mycode").gistFetcher({
    gistId: 3739539
});
```

### Example 2 ###

If Github's servers are down, nothing will be shown in example 1. In this example (example 2) an anchor tag is provided if the servers aren't responding.

```html
<a data-gist="3739539" href="https://gist.github.com/peterssonjesper/3739539">
    Take a look at my code
</a>
```

```javascript
$('a[data-gist]').each(function() {
    $(this).gistFetcher({
        gistId: $(this).data('gist')
    });
});
```

Installation
------------

If you use bower, then simply run
```bash
bower install gistfetcher
```

If not, then simply download src/jquery.gistfetcher.js instad. Include src/jquery.gistfetcher.js as soon as jQuery has been loaded.

Check out the examples directory if you want examples of how to install and use the plugin.
