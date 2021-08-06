import * as ts from "typescript";
import { readFileSync } from "fs";

/*
  USAGE 
    const source = "let foo: string  = 'bar'";

    let result = tsCompile(source);

    console.log(result); // var foo = 'bar';
*/
export const compile = (
  source: string,
  options?: ts.TranspileOptions
): string => {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  if (!options) {
    options = { compilerOptions: { module: ts.ModuleKind.CommonJS } };
  }
  return ts.transpileModule(source, options).outputText;
};

export const compileFromPath = (
  path: string,
  options?: ts.TranspileOptions
) => {
  try {
    const fileContent = readFileSync(path).toString();
    return compile(fileContent, options);
  } catch {
    return "";
  }
};
