module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          // * Fazer os caminhos iguai foram feitos no tsconfig.json
          "@configs": "./src/configs",
          "@controllers": "./src/controllers",
          "@errors": "./src/errors",
          "@models": "./src/models",
        }
      }
    ]
  ],
  ignore: [
    "**/*.test.ts"
  ]
}
