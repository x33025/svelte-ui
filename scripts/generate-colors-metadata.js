import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

// Define the path to your CSS file
const cssFilePath = path.resolve('src/lib/styles/colors.css');

// Read the CSS file
const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

// Parse the CSS using PostCSS
const root = postcss.parse(cssContent);

// Function to extract CSS variables and their section name from a :root block
const extractVariablesWithSection = (rootNode, defaultSectionName) => {
  const variables = {};
  let sectionName = defaultSectionName;
  rootNode.walkDecls(decl => {
    if (decl.prop.startsWith('--') && !decl.prop.endsWith('-rgb')) {
      variables[decl.prop] = decl.value;
    }
  });
  return { sectionName, variables };
};

// Extract variables for each :root block and name the collections
const rootComponents = [];
let lastComment = 'default';
root.walkComments(comment => {
  lastComment = comment.text.trim();
});
root.walkRules(':root', (rule) => {
  const { sectionName, variables } = extractVariablesWithSection(rule, lastComment);
  rootComponents.push({ [sectionName]: variables });
  lastComment = 'default';
});

// Define the output path for the JSON file
const outputPath = path.resolve('src/lib/metadata/colors.json');

// Write the extracted variables to a JSON file
fs.writeFileSync(outputPath, JSON.stringify(rootComponents, null, 2));

console.log(`Colors metadata generated: ${outputPath}`);