# JavaScript CSS Formal Syntax Parser

CSS Formal Syntax Parser is a JavaScript script that allows you to parse a compatible syntax string according to the [W3C CSS formal syntax used for describing property definitions (v4)](https://www.w3.org/TR/css-values-4/) and test other strings to see if they are valid or not according to this syntax.

The script also return proposals if some are available and store the different values found from the tested string.

Currently, script was successfully tested with over **800 differents syntaxes and values** from specific cases to common cases. Test files are available on the `test` directory but you can also [try it online](https://www.dynamiquejs.org/test/tools/css-formal-syntax-parser/css-formal-syntax-parser.html).

**Script can be easily used for form validation or more general string validation** by changing its parameters and by creating your own syntax. Combinators, multipliers and triggers can be added to the main class to extend its functionnality. Please read the [documentation](https://www.dynamiquejs.org/doc/tools/CSSFormalSyntaxParser/index.html) for more details. However, **due to the W3C specification, this script has some limitation and can't be used in all string validation cases**. For example, you won't be able to check if the string `hello  world` is stricly valid according to the syntax `hello world` because the specification accepts multiple spaces/tabs/new lines between values and components. If you need strict checking, you can use my other project **[FormFormat](https://github.com/gauthier-scano/FormFormat)** for that.

## Demo and tests

Test files are available on the `test` directory but you can also [try it online](https://www.dynamiquejs.org/test/tools/css-formal-syntax-parser/css-formal-syntax-parser.html).

To run local tests, go to the `test` directory and open the `css-formal-syntax-parser.html` using an HTTP server.
Click on `Run tests` and open the debugger to see the logs. You can also choose a default formal synthax or write your own and try it out using the dedicated input.

Note : The test file requires Dynamique.js library (available on my GitHub) to run. I use it to manage DOM easily. I will remove this dependency soon to make it easier for people to test.

## Installation

To use the script, just load it in your HTML page. Source is available on GitHub and on the website [www.dynamiquejs.org](https://www.dynamiquejs.org/tools/css-formal-syntax-parser/css-formal-syntax-parser.js).


```html
<script src="https://code.dynamiquejs.org/tools/css-formal-syntax-parser/css-formal-syntax-parser.js"></script>
```

## Usage

Parse a syntax using the class constructor or the `setSyntax` metho  then test strings using the  `test` method:
```javascript
const parser = CSSFormalSyntaxParser("<'border'>");

parser.test("1px solid red"); // valid
parser.test("1px hello world"); // not valid
parser.test("1"); // proposal will be available: "px", "em", "pt"...

// ===

const parser = CSSFormalSyntaxParser();

parser.setSyntax("<'border'>");
parser.test("1px solid red");
```
The `test` method returns an object like this:

```javascript
{
 // Original string tested
  "string": "1px solid red",

 // Value found in string, if more than 1 value is possible (using multiplier), values are in arrays.
 // If groups are used ([]), they are named "groupN", where N is the id of the group starting at 0
  "value": {
    "border": {
      "br-width": {
        "length": {
            "length": "1px"
         }
      },
      "br-style": {
        "solid": "solid"
      },
      "color": {
       "named-color": {
           "red": "red"
         }
       }
    }
  },

 // Proposal available according to the syntax, try the demo to see it live !
  "proposal": [/* if string == "r", proposal = "idge" (ridge), "gb" (rgb), "gba" (rgba), "ed" (red) */],

 // True if the string is valid according to the syntax or false in the other cases
  "valid": true
}
```

## Documentation

The *CSSSyntaxFormalParser* is part of the [www.dynamiquejs.org](www.dynamiquejs.org) library as a *tool*. **Official and complete documentation is available on [its website](https://www.dynamiquejs.org/doc/tools/CSSFormalSyntaxParser/index.html).**

## Features list

* Combinators: `" " && || |`
* Groups: `[ ]`
* Groups required: `[ ]!`
* Link to basic type: `<basic-type>`
* Link to property: `<'property'>`
* Link with range limitation: `<property[min,max]>` (ex: `<integer[-∞,0]>`. Use char `∞` for infinity. Symbol `+` and `-` are optional. Floating value are allowed.)
* Multipliers: `# * + ? {min,max} {min,}` and `#` + another multiplier is supported but `##` is **not** allowed (ex: `#{0,}`= range from 0 to infinity with comma separated value. Char "∞" can also be used. Symbol `+` and `-` are not allowed like floating value: repetition is ever an integer positive value)
* Common property: `inherit | initial | unset` *(please see note)*
* &#x1F534; **Not supported feature** &#x1F534; Commas implicitly omissible: according to the specification *"Commas specified in the grammar are implicitly omissible in some circumstances, when used to separate optional terms in the grammar."* So the syntax `example( first? , second? , third? )` is equivalent to `example( first? [, second]? [, third]? )`. **But ONLY the second format is recognized as a valid syntax by the script.** Properties in file `reference.js` was coded taking that into consideration.


## Specification reminder

This section is extracted from [W3C specification](https://www.w3.org/TR/css-values-4/).

### Component Value Combinators

Component values can be arranged into property values as follows:

* Juxtaposing components means that all of them must occur, in the given order.
* A double ampersand (&&) separates two or more components, all of which must occur, in any order.
* A double bar (||) separates two or more options: one or more of them must occur, in any order.
* A bar (|) separates two or more alternatives: exactly one of them must occur.
* Brackets ([ ]) are for grouping. 

**Juxtaposition is stronger than the double ampersand, the double ampersand is stronger than the double bar, and the double bar is stronger than the bar**. Thus, the following lines are equivalent:

```json
  a b   |   c ||   d &&   e f
[ a b ] | [ c || [ d && [ e f ]]]
```

For reorderable combinators (||, &&), **ordering of the grammar does not matter**: components in the same grouping may be interleaved in any order. Thus, the following lines are equivalent:

```json
a || b || c
b || a || c
```

### Component Value Multipliers

Every type, keyword, or bracketed group may be followed by one of the following modifiers:

* An asterisk (*) indicates that the preceding type, word, or group occurs **zero or more times**.
* A plus (+) indicates that the preceding type, word, or group occurs **one or more times**.
* A question mark (?) indicates that the preceding type, word, or group is optional (occurs **zero or one times**).
* A single number in curly braces ({A}) indicates that the preceding type, word, or group **occurs A times**.
* A comma-separated pair of numbers in curly braces ({A,B}) indicates that the preceding type, word, or group occurs at least A and at most B times. The B may be omitted ({A,}) to indicate that there must be at least **A repetitions, with no upper bound on the number of repetitions**.
* A hash mark (#) indicates that the preceding type, word, or group occurs one or more times, separated by comma tokens (which may optionally be surrounded by white space and/or comments). It may optionally be followed by the curly brace forms, above, to **indicate precisely how many times the repetition occurs**, like <length>#{1,4}.
* An exclamation point **(!) after a group indicates that the group is required and must produce at least one value**; even if the grammar of the items within the group would otherwise allow the entire contents to be omitted, at least one component value must not be omitted. 

For repeated component values (indicated by *, +, or #), **UAs must support at least 20 repetitions of the component**. If a property value contains more than the supported number of repetitions, the declaration must be ignored as if it were invalid.

### Component Values and White Space

Unless otherwise specified, **white space and/or comments may appear before, after, and/or between components** combined using the above combinators and multipliers.

## Notes

### Common property

Currently, the common properties `inherit | initial | unset` is **automatically add to the syntax** when method *setSyntax* is called. If you want to use basic data type as a syntax, you must disable this feature to comply with the specification. To do this, simply set  the 2nd argument of the method `setSyntax` to `false`: `setSyntax("<box>", false);`.

### CSS property reference error

The formal syntax definitions of CSS properties change really often due to the upgrading standards so don't hesitate to told me if files or test need to be updated.

### Infinite loop using combinator `<`

When a property or basic type is linked using the `<` combiner, all of its self-linked sub-properties and / or base types are parsed, prepared and stored in memory for later use in order to optimize the performance.

Currently, the script is not (*yet*) protected from the infinite recursion that a syntax with sub-property can create. Watch out for the infinite loop:

```javascript
// Don't try this code, infinite loop will occured when one of these syntax will be parsed
"syntax1" = "hello+ world. <'syntax2'>";
"syntax2" = "My name is john doe. <'syntax3'>";
"syntax3" = "<'syntax1'> Nice to meet you.";
```

## Project status

Project is actively developped. Actual version is version `1.0`. The version number is defined according to the version definition of [www.dynamiquejs.org](https://dynamiquejs.org/doc/symbole.html).

Version `1.1` will include:
* Support of the "Commas implicitly omissible" case;
* Infinite loop prevention (*please see note*);
* PHP version.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Support

If you want to support my projects and works, do not hesitate to buy me a coffee at [https://www.buymeacoffee.com/GauthierScano](https://www.buymeacoffee.com/GauthierScano) !

Thank you !

## License
[MIT](https://choosealicense.com/licenses/mit/)
