/**
 * Agent 编排器
 * 负责协调三个 Agent 的工作流程
 */

const DocumentParserAgent = require('../agents/DocumentParserAgent');
const StructureValidatorAgent = require('../agents/StructureValidatorAgent');
const PresentationGeneratorAgent = require('../agents/PresentationGeneratorAgent');

class Orchestrator {
  constructor(config) {
    this.parserAgent = new DocumentParserAgent(config);
    this.validatorAgent = new StructureValidatorAgent(config);
    this.generatorAgent = new PresentationGeneratorAgent(config);
  }

  /**
   * 执行完整的文档处理流程
   * @param {string} input - 输入内容
   * @param {string} type - 文档类型
   */
  async process(input, type) {
    console.log('[Orchestrator] Starting document processing pipeline...');

    // 步骤 1: 文档解析
    const parsed = await this.parserAgent.parse(input, type);
    if (!parsed.success) {
      throw new Error('Document parsing failed');
    }

    // 步骤 2: 结构校验
    const validation = await this.validatorAgent.validate(parsed.data);
    const fixed = await this.validatorAgent.fix(parsed.data, validation.violations);

    // 步骤 3: 演示生成
    const presentation = await this.generatorAgent.generate(fixed);

    return {
      document: fixed,
      validation: validation,
      presentation: presentation
    };
  }
}

module.exports = Orchestrator;
