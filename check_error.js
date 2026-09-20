const fs = require('fs');
const filepath = 'src/components/curriculum/ChapterView.tsx';
let content = fs.readFileSync(filepath, 'utf8');
const lines = content.split('\n');

const extractSnippet = (start, end) => {
    return lines.slice(start-5, end+5).join('\n');
}
console.log(extractSnippet(590, 605));
