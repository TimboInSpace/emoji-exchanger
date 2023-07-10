# emoji-exchanger
Exchanges shortcode-style emoji for their native representations.



I have a lot of documentation written github-style emoji shortcodes. For example:

- `:grin:` = :grin:
- `:cactus:` = :cactus:
- `:cat:` = :cat:

Unfortunately, I just started using a static site generator that renders markdown, *but does not render emoji shortcodes* :scream: It does, however, render system emoji. 

> To expedite your local testing, I've included a minimal Hugo website for testing the rendering of markdown files with emoji inside. Just stick your `.md` files in the `/content` directory and you're good to go. 

To run the Hugo server locally, do the following:

```
cd /home/whatever/emoji-exchanger/hugotester
hugo server -D
```



## Instructions

Use NodeJS to run `exchanger.js`. Provide an input filename and output filename for conversion.

```
node exchanger.js INFILE OUTFILE
```



For example:

```
node exchanger.js ./hugotest/hugotester/content/input.md ./hugotest/hugotester/content/output.md
```



## Acknowledgement

Thank you very much to @oliveratgithub [for providing this gist](https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb#file-emojis-json), containing a JSON file that facilitated the emoji conversion. They put together a very complete list of emojis and their various representation.
