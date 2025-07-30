// Componente para gerenciamento do WhatsApp Dashboard
document.addEventListener('alpine:init', () => {
    Alpine.data('whatsappSection', () => ({
        conversations: [],
        messages: [],
        selectedConversation: null,
        newMessage: '',
        loading: false,
        error: null,
        searchQuery: '',
        
        init() {
            this.fetchConversations();
        },
        
        fetchConversations() {
            this.loading = true;
            this.error = null;
            
            // Em produção, buscar dados da API
            // Simulação de dados para demonstração
            setTimeout(() => {
                this.conversations = [
                    {
                        id: '1',
                        phone: '5511999999999',
                        name: 'João Silva',
                        last_message: 'Olá, gostaria de saber mais sobre o sistema.',
                        timestamp: new Date().toISOString(),
                        unread: 2,
                        avatar: null
                    },
                    {
                        id: '2',
                        phone: '5511888888888',
                        name: 'Maria Oliveira',
                        last_message: 'Obrigado pelo atendimento!',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        unread: 0,
                        avatar: null
                    },
                    {
                        id: '3',
                        phone: '5511777777777',
                        name: 'Carlos Pereira',
                        last_message: 'Qual o valor do plano Pro?',
                        timestamp: new Date(Date.now() - 7200000).toISOString(),
                        unread: 1,
                        avatar: null
                    },
                    {
                        id: '4',
                        phone: '5511666666666',
                        name: 'Ana Santos',
                        last_message: 'Vou pensar e retorno depois.',
                        timestamp: new Date(Date.now() - 86400000).toISOString(),
                        unread: 0,
                        avatar: null
                    },
                    {
                        id: '5',
                        phone: '5511555555555',
                        name: 'Roberto Almeida',
                        last_message: 'Preciso de ajuda com a configuração.',
                        timestamp: new Date(Date.now() - 172800000).toISOString(),
                        unread: 0,
                        avatar: null
                    }
                ];
                this.loading = false;
            }, 1000);
        },
        
        get filteredConversations() {
            if (!this.searchQuery.trim()) return this.conversations;
            
            const query = this.searchQuery.toLowerCase();
            return this.conversations.filter(conv => 
                conv.name.toLowerCase().includes(query) || 
                conv.phone.includes(query) ||
                conv.last_message.toLowerCase().includes(query)
            );
        },
        
        selectConversation(id) {
            this.selectedConversation = id;
            this.fetchMessages(id);
            
            // Marcar como lido
            const conversation = this.conversations.find(c => c.id === id);
            if (conversation) {
                conversation.unread = 0;
            }
        },
        
        fetchMessages(conversationId) {
            this.loading = true;
            this.messages = [];
            
            // Em produção, buscar dados da API
            // Simulação de dados para demonstração
            setTimeout(() => {
                if (conversationId === '1') {
                    this.messages = [
                        {
                            id: '101',
                            sender: 'user',
                            content: 'Olá, gostaria de saber mais sobre o sistema.',
                            timestamp: new Date(Date.now() - 7200000).toISOString()
                        },
                        {
                            id: '102',
                            sender: 'bot',
                            content: 'Olá! O Zynapse é um sistema de automação comercial que utiliza IA para melhorar o atendimento ao cliente. Como posso ajudar?',
                            timestamp: new Date(Date.now() - 7180000).toISOString()
                        },
                        {
                            id: '103',
                            sender: 'user',
                            content: 'Quais são os planos disponíveis?',
                            timestamp: new Date(Date.now() - 3600000).toISOString()
                        },
                        {
                            id: '104',
                            sender: 'bot',
                            content: 'Temos três planos: Free, Pro e Enterprise. Cada um com diferentes funcionalidades e limites de uso. Posso enviar mais detalhes se desejar.',
                            timestamp: new Date(Date.now() - 3580000).toISOString()
                        }
                    ];
                } else if (conversationId === '2') {
                    this.messages = [
                        {
                            id: '201',
                            sender: 'user',
                            content: 'Olá, estou interessada no plano Pro.',
                            timestamp: new Date(Date.now() - 86400000).toISOString()
                        },
                        {
                            id: '202',
                            sender: 'bot',
                            content: 'Olá Maria! O plano Pro custa R$ 99/mês e inclui todas as funcionalidades básicas mais campanhas ilimitadas e treinamento personalizado da IA. Posso te enviar uma proposta detalhada?',
                            timestamp: new Date(Date.now() - 86380000).toISOString()
                        },
                        {
                            id: '203',
                            sender: 'user',
                            content: 'Sim, por favor.',
                            timestamp: new Date(Date.now() - 86000000).toISOString()
                        },
                        {
                            id: '204',
                            sender: 'bot',
                            content: 'Ótimo! Acabei de enviar a proposta para seu email. Confira sua caixa de entrada.',
                            timestamp: new Date(Date.now() - 85800000).toISOString()
                        },
                        {
                            id: '205',
                            sender: 'user',
                            content: 'Obrigado pelo atendimento!',
                            timestamp: new Date(Date.now() - 3600000).toISOString()
                        }
                    ];
                } else if (conversationId === '3') {
                    this.messages = [
                        {
                            id: '301',
                            sender: 'user',
                            content: 'Qual o valor do plano Pro?',
                            timestamp: new Date(Date.now() - 7200000).toISOString()
                        }
                    ];
                } else if (conversationId === '4') {
                    this.messages = [
                        {
                            id: '401',
                            sender: 'user',
                            content: 'Olá, gostaria de uma demonstração do sistema.',
                            timestamp: new Date(Date.now() - 172800000).toISOString()
                        },
                        {
                            id: '402',
                            sender: 'bot',
                            content: 'Olá Ana! Claro, podemos agendar uma demonstração. Qual seria o melhor dia e horário para você?',
                            timestamp: new Date(Date.now() - 172780000).toISOString()
                        },
                        {
                            id: '403',
                            sender: 'user',
                            content: 'Talvez na próxima semana, segunda ou terça.',
                            timestamp: new Date(Date.now() - 172700000).toISOString()
                        },
                        {
                            id: '404',
                            sender: 'bot',
                            content: 'Perfeito! Temos disponibilidade na segunda às 14h ou na terça às 10h. Qual prefere?',
                            timestamp: new Date(Date.now() - 172680000).toISOString()
                        },
                        {
                            id: '405',
                            sender: 'user',
                            content: 'Vou pensar e retorno depois.',
                            timestamp: new Date(Date.now() - 86400000).toISOString()
                        }
                    ];
                } else if (conversationId === '5') {
                    this.messages = [
                        {
                            id: '501',
                            sender: 'user',
                            content: 'Preciso de ajuda com a configuração.',
                            timestamp: new Date(Date.now() - 172800000).toISOString()
                        },
                        {
                            id: '502',
                            sender: 'bot',
                            content: 'Olá Roberto! Em qual parte da configuração você está com dificuldade?',
                            timestamp: new Date(Date.now() - 172780000).toISOString()
                        },
                        {
                            id: '503',
                            sender: 'user',
                            content: 'Na integração com meu sistema atual.',
                            timestamp: new Date(Date.now() - 172700000).toISOString()
                        },
                        {
                            id: '504',
                            sender: 'bot',
                            content: 'Entendi. Vou te enviar um guia detalhado sobre como fazer essa integração. Se preferir, podemos agendar uma sessão de suporte técnico.',
                            timestamp: new Date(Date.now() - 172680000).toISOString()
                        }
                    ];
                }
                
                this.loading = false;
                
                // Scroll para o final da conversa
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }, 1000);
        },
        
        scrollToBottom() {
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },
        
        sendMessage() {
            if (!this.newMessage.trim() || !this.selectedConversation) return;
            
            const message = {
                id: `new-${Date.now()}`,
                sender: 'bot',
                content: this.newMessage,
                timestamp: new Date().toISOString()
            };
            
            this.messages.push(message);
            
            // Atualizar última mensagem na lista de conversas
            const conversation = this.conversations.find(c => c.id === this.selectedConversation);
            if (conversation) {
                conversation.last_message = this.newMessage;
                conversation.timestamp = message.timestamp;
            }
            
            this.newMessage = '';
            
            // Scroll para o final da conversa
            this.$nextTick(() => {
                this.scrollToBottom();
            });
            
            // Simular resposta do usuário
            setTimeout(() => {
                const response = {
                    id: `new-${Date.now()}`,
                    sender: 'user',
                    content: 'Obrigado pela informação!',
                    timestamp: new Date().toISOString()
                };
                
                this.messages.push(response);
                
                // Atualizar última mensagem na lista de conversas
                if (conversation) {
                    conversation.last_message = response.content;
                    conversation.timestamp = response.timestamp;
                }
                
                // Scroll para o final da conversa
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }, 2000);
        },
        
        clearConversation() {
            if (!confirm('Tem certeza que deseja limpar o histórico desta conversa?')) return;
            
            this.messages = [];
            
            // Atualizar última mensagem na lista de conversas
            const conversation = this.conversations.find(c => c.id === this.selectedConversation);
            if (conversation) {
                conversation.last_message = 'Histórico limpo';
                conversation.timestamp = new Date().toISOString();
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                // Hoje - mostrar hora
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (diffDays === 1) {
                // Ontem
                return 'Ontem';
            } else if (diffDays < 7) {
                // Esta semana - mostrar dia da semana
                const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                return days[date.getDay()];
            } else {
                // Mais de uma semana - mostrar data completa
                return date.toLocaleDateString();
            }
        },
        
        getInitials(name) {
            if (!name) return '';
            return name.split(' ').map(n => n[0]).join('').toUpperCase();
        }
    }));
});
