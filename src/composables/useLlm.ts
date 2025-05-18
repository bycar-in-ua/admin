import { readonly, ref } from "vue";

const LLM_NAME_STORAGE_KEY = "bycar-ai-model";

const DEFAULT_LLM = import.meta.env.VITE_DEFAULT_LLM || "openai/gpt-4.1-mini";

const availableModels = [
  "openai/gpt-4.1-mini",
  "openai/gpt-4.1-nano",
  "google/gemini-2.5-flash-preview",
  "mistralai/ministral-8b",
  "meta-llama/llama-3.1-70b-instruct",
  "deepseek/deepseek-chat",
];

/**
 * @returns {string} The name of the LLM (Large Language Model) to be used in Openrouter.ai
 * @see https://openrouter.ai/models
 */
export function getLlmName(): string {
  const storedModel = localStorage.getItem(LLM_NAME_STORAGE_KEY);

  return storedModel ?? DEFAULT_LLM;
}

export function useLlm() {
  const llmName = ref(getLlmName());

  function setLlmName(name: string) {
    localStorage.setItem(LLM_NAME_STORAGE_KEY, name);
    llmName.value = name;
  }

  return { llmName: readonly(llmName), setLlmName, availableModels };
}
