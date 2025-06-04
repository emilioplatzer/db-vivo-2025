
export function ssPage(content:string){
    return `<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <style>
* {font-family: Monoto, Bokoto, Arial}
        </style>
    </head>
    <body>
${content}
    </body>
</html>`
}
