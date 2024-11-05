function convertHtml2JsonAndSet() {
  const htmlTextAreaValue = document.getElementById("html").value;
  const jsonObj = html2json(htmlTextAreaValue);
  const jsonArea = document.getElementById("json");
  jsonArea.textContent = JSON.stringify(jsonObj, null, 2);
}

/* 
  Update this function to convert html into json object.
  You can rewrite it completely, just be sure it accepts htmlText as string and outputs json object.
*/
function createElement(tag, attrs, children, content) {
  return {
    tag: tag,
    attributes: attrs || [],
    children: children || [],
    content: content || "",
  };
}

function parseAttributes(attrString) {
  const attributes = {};
  attrString
    .trim()
    .split(" ")
    .forEach((attr) => {
      const [key, value] = attr.split("=");
      if (key) attributes[key] = value ? value.replace(/['"]/g, "") : true;
    });
  return attributes;
}

function convertHtml2JsonAndSet() {
  const htmlTextAreaValue = document.getElementById("html").value;
  const jsonObj = html2json(htmlTextAreaValue);
  const jsonArea = document.getElementById("json");
  jsonArea.textContent = JSON.stringify(jsonObj, null, 2);
}

/* 
  Update this function to convert html into json object.
  You can rewrite it completely, just be sure it accepts htmlText as string and outputs json object.
*/
function createElement(tag, attrs, children, content) {
  return {
    tag: tag,
    attributes: attrs || [],
    children: children || [],
    content: content || "",
  };
}

function parseAttributes(attrString) {
  const attributes = {};
  attrString
    .trim()
    .split(" ")
    .forEach((attr) => {
      const [key, value] = attr.split("=");
      if (key) attributes[key] = value ? value.replace(/['"]/g, "") : true;
    });
  return attributes;
}

function html2json(htmlText) {
  const stack = [];
  const elements = [];
  let pos = 0;

  while (pos < htmlText.length) {
    const openTag = htmlText.indexOf("<", pos);
    if (openTag === -1) break;

    const tagEnd = htmlText.indexOf(">", openTag);
    const tagContent = htmlText.slice(openTag + 1, tagEnd).trim();
    const isClosingTag = tagContent.startsWith("/");
    const tagName = isClosingTag
      ? tagContent.slice(1)
      : tagContent.split(" ")[0];
    const attrs = isClosingTag
      ? {}
      : parseAttributes(tagContent.slice(tagName.length));

    if (!isClosingTag) {
      const element = createElement(tagName, attrs, [], "");
      stack.push(element);

      if (stack.length === 1) {
        elements.push(element);
      } else {
        stack[stack.length - 2].children.push(element);
      }
    } else {
      const closedElement = stack.pop();

      const closeTagStart = htmlText.indexOf(`</${tagName}>`, tagEnd);

      const textContent = htmlText
        .slice(pos, openTag)
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim();

      if (textContent) {
        closedElement.content = textContent;
      }

      pos = closeTagStart + tagName.length;
    }
    pos = tagEnd + 1;
  }

  return elements;
}
