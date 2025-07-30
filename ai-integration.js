// Arquivo para integração do bot WhatsApp com a OpenAI
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Verificar se a chave da API está definida
if (!process.env.OPENAI_API_KEY) {
  console.error('Erro: OPENAI_API_KEY não encontrada no arquivo .env');
  process.exit(1);
}

// Configurar cliente OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Histórico de conversas (simplificado - em produção, use um banco de dados)
const conversations = {};

// Função para gerar resposta usando a OpenAI
async function generateAIResponse(phone, message) {
  try {
    // Inicializar histórico de conversa se não existir
    if (!conversations[phone]) {
      conversations[phone] = [];
    }
    
    // Adicionar mensagem do usuário ao histórico
    conversations[phone].push({ role: 'user', content: message });
    
    // Manter apenas as últimas 10 mensagens para controle de contexto
    if (conversations[phone].length > 10) {
      conversations[phone] = conversations[phone].slice(-10);
    }
    
    // Preparar mensagens para a API, incluindo um sistema prompt
    const messages = [
      { 
        role: 'system', 
        content: 'Você é um assistente virtual da Zynapse, uma empresa de automação comercial. Seja cordial, profissional e conciso. Limite suas respostas a 3-4 frases no máximo. Ofereça ajuda sobre produtos de automação comercial, atendimento ao cliente e agendamento de demonstrações.' 
      },
      ...conversations[phone]
    ];
    
    // Chamar a API da OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 150,
      temperature: 0.7,
    });
    
    // Extrair resposta
    const aiResponse = completion.data.choices[0].message.content.trim();
    
    // Adicionar resposta ao histórico
    conversations[phone].push({ role: 'assistant', content: aiResponse });
    
    // Registrar a interação (em produção, salve em um banco de dados)
    console.log(`[${new Date().toISOString()}] Conversa com ${phone}:`);
    console.log(`Usuário: ${message}`);
    console.log(`IA: ${aiResponse}`);
    
    return aiResponse;
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error);
    
    // Verificar se é um erro da API
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    
    // Retornar mensagem de fallback em caso de erro
    return 'Desculpe, estou com dificuldades para processar sua solicitação no momento. Por favor, tente novamente mais tarde ou entre em contato com nosso suporte.';
  }
}

// Função para limpar o histórico de conversa
function clearConversationHistory(phone) {
  if (conversations[phone]) {
    conversations[phone] = [];
    return true;
  }
  return false;
}

module.exports = {
  generateAIResponse,
  clearConversationHistory
};
