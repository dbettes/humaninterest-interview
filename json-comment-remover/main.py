
def remove_comments(inputString):
    lines = inputString.split("\n")

    multilineFound = False
    result = ""

    for line in lines:
        inString = False
        foundComment = False
        newLine = ""

        for idx, char in enumerate(line):
            # check for double quotes or escaped double quotes
            if char == "\"" and line[idx-1] != "\\":
                inString = not inString

            # check for comment
            if char == "/" and line[idx+1] == "/" and not inString:
                foundComment = True
            
            # check for multi-line start
            if not inString and char == "/" and line[idx+1] == "*":
                multilineFound = True

            # check for multi-lie end
            if multilineFound and char == "*" and line[idx+1] == "/":
                multilineFound = False
                break

            # output anything that' not a comment
            if not foundComment and not multilineFound:
                newLine += char
        
        # skip blank lines (from removing comments)
        if not newLine.isspace() and newLine != "":
            result += newLine + "\n"

    print(result)
        
input1 = r"""{ // comment here
  "key1": "value1",
  "urls": ["https://humaninterest.com"]  // another comment
} // final comment "with quotes" """

input2 = r"""{
  "key1": "value1",
  "urls": ["{\"root\": \"https://humaninterest.com\"}"]
}"""

input3 = r"""{ // comment here
  /* this is a multi-line
     comment that uses several
     lines */
  "key1": "value1",
  "urls": ["https://humaninterest.com"]  // another comment
}"""

remove_comments(input1)
remove_comments(input2)
remove_comments(input3)