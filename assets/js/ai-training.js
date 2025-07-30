// Componente para treinamento da IA
document.addEventListener('alpine:init', () => {
    Alpine.data('aiTrainingSection', () => ({
        loading: false,
        saving: false,
        success: null,
        error: null,
        
        // Dados do prompt
        promptData: {
            personality: 'Assistente de vendas amigável e prestativo',
            knowledge: 'Conhecimento sobre produtos e serviços da empresa',
            tone: 'Profissional mas acolhedor',
            instructions: 'Responda às perguntas dos clientes de forma clara e objetiva. Ofereça soluções personalizadas com base nas necessidades do cliente. Sempre tente identificar oportunidades de venda, mas sem ser invasivo.',
            examples: [
                {
                    question: 'Qual a diferença entre o plano básico e o premium?',
                    answer: 'O plano básico inclui acesso a recursos essenciais como X, Y e Z, ideal para pequenas empresas começando. Já o plano premium oferece recursos avançados como A, B e C, perfeito para empresas em crescimento que precisam de mais funcionalidades. Com base no seu perfil, posso sugerir qual seria mais adequado para você.'
                },
                {
                    question: 'Vocês oferecem suporte técnico?',
                    answer: 'Sim! Todos os nossos planos incluem suporte técnico. No plano básico, oferecemos suporte por email com tempo de resposta de até 24h. No plano premium, você tem acesso a suporte prioritário por chat e telefone, com atendimento em até 2 horas. Posso te dar mais detalhes sobre nosso suporte se desejar.'
                }
            ]
        },
        
        // Parâmetros avançados
        aiParams: {
            temperature: 0.7,
            max_tokens: 500,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        },
        
        init() {
            this.loadPromptData();
            this.loadAIParams();
        },
        
        loadPromptData() {
            this.loading = true;
            
            // Em produção, buscar dados do prompt da API
            // Simulação para demonstração
            setTimeout(() => {
                // Dados já inicializados acima
                this.loading = false;
            }, 1000);
        },
        
        loadAIParams() {
            // Em produção, buscar parâmetros da API
            // Simulação para demonstração
            setTimeout(() => {
                // Dados já inicializados acima
            }, 1000);
        },
        
        savePrompt() {
            this.saving = true;
            this.success = null;
            this.error = null;
            
            // Em produção, enviar dados do prompt para a API
            // Simulação para demonstração
            setTimeout(() => {
                this.saving = false;
                this.success = 'Prompt salvo com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }, 1500);
        },
        
        saveParams() {
            this.saving = true;
            this.success = null;
            this.error = null;
            
            // Em produção, enviar parâmetros para a API
            // Simulação para demonstração
            setTimeout(() => {
                this.saving = false;
                this.success = 'Parâmetros salvos com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }, 1500);
        },
        
        addExample() {
            this.promptData.examples.push({
                question: '',
                answer: ''
            });
        },
        
        removeExample(index) {
            this.promptData.examples.splice(index, 1);
        },
        
        resetToDefault() {
            if (confirm('Tem certeza que deseja restaurar as configurações padrão? Todas as personalizações serão perdidas.')) {
                this.loadPromptData();
                this.loadAIParams();
                this.success = 'Configurações restauradas para o padrão!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }
        }
    }));
});
