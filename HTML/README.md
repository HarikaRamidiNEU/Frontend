This assignment is to learn CSS positioning, Grid layout / Flexbox, SCSS features like variables, mixins, inheritance, loops, functions, math operations, etc.

Sass is a stylesheet language that’s compiled to CSS. The SCSS files uses the extension .scss and it is a super set of css, there are many features that are used as part of this assignment, they are:
> mixins
    Mixins allow you to define styles that can be re-used throughout your stylesheet. They make it easy to avoid using non-semantic classes like .float-left, and to distribute collections of styles in libraries.
> include 
    Mixins are included into the current context using the @include at-rule
> variables
    Sass variables are simple: you assign a value to a name that begins with $, and then you can refer to that name instead of the value itself. But despite their simplicity, they're one of the most useful tools Sass brings to the table. Variables make it possible to reduce repetition, do complex math, configure libraries, and much more.
> nested selectors
    parent child relation can be simplified by nesting the child within parent.
> inheritance
    When one class selector extends another, it works exactly as though you added the extended class to every element in your HTML that already had the extending class. It’s written @extend <selector>, and it tells Sass that one selector should inherit the styles of another.
> loops
    The @each rule makes it easy to emit styles or evaluate code for each element of a list or each pair in a map. The @for rule counts up or down from one number (the result of the first expression) to another (the result of the second) and evaluates a block for each number in between.
> if else
    The @if rule is written @if <expression> { ... }, and it controls whether or not its block gets evaluated.
>functions
    Functions allow you to define complex operations on SassScript values that you can re-use throughout your stylesheet. They make it easy to abstract out common formulas and behaviors in a readable way.
>Interpolation
    Interpolation can be used almost anywhere in a Sass stylesheet to embed the result of a SassScript expression into a chunk of CSS. Just wrap an expression in #{} in any of the following places:

Sass helps keep large stylesheets well-organized and makes it easy to share design within and across projects.

reference: https://sass-lang.com/documentation