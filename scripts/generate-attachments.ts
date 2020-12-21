// @ts-ignore
import { stripIndents } from 'common-tags';
import fs from 'fs';

import {
  table,
  code,
  camelizeSmall,
  header,
  link,
  dasherize,
  pre,
  generateAnchor,
  bold
} from './doc-methods';

const generateAttachments = (path: string): string => {
  const data: string = fs.readFileSync(`${__dirname}/../packages/puregram/src/${path}.ts`).toString();

  const { name, extended } = data.match(/(?:class\s(?<name>.+?)(?:<.+>)?(\sextends\s(?<extended>.+?)(<.+>)?)?\s{)/is)!.groups!;
  const variable: string = camelizeSmall(name);

  let result: string = stripIndents`
    ${header(1, code(name))}
    
    Класс **${name}**${
      extended
        ? `, наследуется от ${link(code(extended), `${dasherize(extended)}.md`)}`
        : ''
    }.
    
    ${pre('js', `import { ${name} } from 'puregram';`)}
    
    ${header(2, 'Constructor')}
    
    ${pre('js', `const ${variable} = new ${name}(payload);`)}
    
    ${
      table(
        [
          ['Параметр', 'Тип'],
          [code('payload'), link(code(`Telegram${name}`), `https://core.telegram.org/bots/api#${name.toLowerCase()}`)]
        ]
      )
    }
  `;

  // cringe

  const getterRe: string = '(?:public\\sget\\s(.+?)\\(\\):\\s(.+?)\\s{)';

  const rawGetters: RegExpMatchArray | null = data.match(new RegExp(getterRe, 'gi'));

  if (rawGetters !== null) {
    const getters: [string, string][] = rawGetters.map(
      (element: string) => element.match(new RegExp(getterRe, 'i'))!
    ).map(
      (element: string[]) => [element[1], element[2]]
    );
  
    const gettersResult: string = stripIndents`
      ${header(2, 'Геттеры класса')}
  
      ${header(3, 'Содержание')}
      
      ${
        getters.map(
          ([getter]: [string, string]) => `* ${link(code(getter), generateAnchor(getter))}`
        ).join('\n')
      }
      
      ---
      
      ${
        getters.map(
          ([getter, type]: [string, string]) => stripIndents`
            ${header(3, code(getter))}
            
            ${bold('')}
            
            ${pre('ts', `${variable}.${getter} // => ${type}`)}
          `
        ).join('\n\n')
      }
    `;
  
    result += `\n\n${gettersResult}\n`;
  }

  fs.writeFileSync(`${__dirname}/../docs/ru/${path}.md`, result);

  return result;
};

generateAttachments('common/keyboards/force-reply');
