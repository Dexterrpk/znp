// Componente para controle do bot WhatsApp
document.addEventListener('alpine:init', () => {
    Alpine.data('botControlSection', () => ({
        botStatus: 'stopped', // 'running', 'stopped', 'loading'
        qrCode: null,
        logs: '',
        loading: false,
        error: null,
        
        init() {
            this.checkBotStatus();
            // Verificar status a cada 30 segundos
            setInterval(() => {
                this.checkBotStatus();
            }, 30000);
        },
        
        checkBotStatus() {
            this.loading = true;
            
            // Em produção, buscar status da API
            // Simulação para demonstração
            setTimeout(() => {
                this.botStatus = 'stopped';
                this.loading = false;
                this.fetchLogs();
            }, 1000);
        },
        
        startBot() {
            if (this.botStatus === 'running') return;
            
            this.loading = true;
            this.botStatus = 'loading';
            this.error = null;
            
            // Em produção, chamar API para iniciar o bot
            // Simulação para demonstração
            setTimeout(() => {
                this.botStatus = 'running';
                this.loading = false;
                this.generateQRCode();
                this.fetchLogs();
                
                // Atualizar QR code a cada 5 segundos durante 30 segundos (simulação de conexão)
                let attempts = 0;
                const qrInterval = setInterval(() => {
                    attempts++;
                    if (attempts >= 6) {
                        clearInterval(qrInterval);
                        this.qrCode = null; // QR code não é mais necessário após conexão
                        return;
                    }
                    this.generateQRCode();
                }, 5000);
            }, 2000);
        },
        
        stopBot() {
            if (this.botStatus === 'stopped') return;
            
            this.loading = true;
            this.error = null;
            
            // Em produção, chamar API para parar o bot
            // Simulação para demonstração
            setTimeout(() => {
                this.botStatus = 'stopped';
                this.loading = false;
                this.qrCode = null;
                this.fetchLogs();
            }, 2000);
        },
        
        generateQRCode() {
            this.qrCode = null; // Limpa o QR code anterior
            this.error = null;
            fetch('/api/v1/bot/qrcode', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('zynapse_token')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível obter o QR Code. O bot pode não estar pronto ou conectado.');
                }
                return response.text();
            })
            .then(qrData => {
                this.qrCode = qrData;
                this.$nextTick(() => {
                    if (document.getElementById('qrcode')) {
                        document.getElementById('qrcode').innerHTML = '';
                        new QRCode(document.getElementById('qrcode'), {
                            text: qrData,
                            width: 200,
                            height: 200,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao buscar QR Code:', error);
                this.error = error.message;
            });
        },
        
        fetchLogs() {
            // Em produção, buscar logs da API
            // Simulação para demonstração
            if (this.botStatus === 'running') {
                this.logs = `[${new Date().toLocaleString()}] Bot iniciado com sucesso\n[${new Date().toLocaleString()}] Conectado ao WhatsApp\n[${new Date().toLocaleString()}] Pronto para receber mensagens`;
            } else {
                this.logs = `[${new Date().toLocaleString()}] Bot parado\n[${new Date().toLocaleString()}] Desconectado do WhatsApp`;
            }
        },
        
        refreshLogs() {
            this.fetchLogs();
        }
    }));
});
