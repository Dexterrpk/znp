// Componente para gerenciamento de campanhas
document.addEventListener('alpine:init', () => {
    Alpine.data('campaignsSection', () => ({
        loading: false,
        saving: false,
        success: null,
        error: null,
        showNewCampaignForm: false,
        showEditCampaignForm: false,
        
        // Lista de campanhas
        campaigns: [],
        
        // Filtros
        filters: {
            status: 'all', // all, active, scheduled, completed, draft
            search: ''
        },
        
        // Campanha atual para edição
        currentCampaign: {
            id: null,
            name: '',
            description: '',
            message: '',
            status: 'draft',
            scheduled_date: '',
            scheduled_time: '',
            target_audience: 'all', // all, new_customers, existing_customers, inactive
            recipients: [],
            media_url: '',
            has_media: false
        },
        
        // Contatos disponíveis
        availableContacts: [],
        selectedContacts: [],
        
        init() {
            this.loadCampaigns();
            this.loadContacts();
        },
        
        loadCampaigns() {
            this.loading = true;
            
            // Em produção, buscar campanhas da API
            // Simulação para demonstração
            setTimeout(() => {
                this.campaigns = [
                    {
                        id: 1,
                        name: 'Promoção de Verão',
                        description: 'Campanha promocional para produtos de verão com 20% de desconto',
                        message: 'Olá {nome}! Aproveite nossa promoção de verão com 20% OFF em todos os produtos da coleção verão. Use o cupom VERAO20 no checkout. Válido até 31/01.',
                        status: 'active',
                        scheduled_date: '2025-01-15',
                        scheduled_time: '10:00',
                        sent_count: 120,
                        delivered_count: 118,
                        read_count: 95,
                        response_count: 42,
                        target_audience: 'all',
                        recipients: [],
                        media_url: 'https://example.com/promo-verao.jpg',
                        has_media: true,
                        created_at: '2025-01-10T14:30:00Z'
                    },
                    {
                        id: 2,
                        name: 'Lançamento Novo Produto',
                        description: 'Anúncio do lançamento da nova linha de produtos',
                        message: 'Olá {nome}! Temos novidades! Acabamos de lançar nossa nova linha de produtos. Confira em primeira mão: https://example.com/lancamento',
                        status: 'scheduled',
                        scheduled_date: '2025-01-25',
                        scheduled_time: '09:00',
                        sent_count: 0,
                        delivered_count: 0,
                        read_count: 0,
                        response_count: 0,
                        target_audience: 'existing_customers',
                        recipients: [],
                        media_url: '',
                        has_media: false,
                        created_at: '2025-01-12T11:15:00Z'
                    },
                    {
                        id: 3,
                        name: 'Pesquisa de Satisfação',
                        description: 'Pesquisa para avaliar a satisfação dos clientes',
                        message: 'Olá {nome}! Sua opinião é muito importante para nós. Poderia responder a uma breve pesquisa de satisfação? Leva apenas 2 minutos: https://example.com/pesquisa',
                        status: 'completed',
                        scheduled_date: '2025-01-05',
                        scheduled_time: '14:00',
                        sent_count: 200,
                        delivered_count: 195,
                        read_count: 150,
                        response_count: 87,
                        target_audience: 'new_customers',
                        recipients: [],
                        media_url: '',
                        has_media: false,
                        created_at: '2025-01-03T09:45:00Z'
                    },
                    {
                        id: 4,
                        name: 'Reativação de Clientes',
                        description: 'Campanha para reativar clientes inativos',
                        message: 'Olá {nome}! Sentimos sua falta! Que tal voltar com um desconto especial de 15% na sua próxima compra? Use o cupom VOLTA15. Válido por 7 dias.',
                        status: 'draft',
                        scheduled_date: '',
                        scheduled_time: '',
                        sent_count: 0,
                        delivered_count: 0,
                        read_count: 0,
                        response_count: 0,
                        target_audience: 'inactive',
                        recipients: [],
                        media_url: '',
                        has_media: false,
                        created_at: '2025-01-14T16:20:00Z'
                    }
                ];
                this.loading = false;
            }, 1000);
        },
        
        loadContacts() {
            // Em produção, buscar contatos da API
            // Simulação para demonstração
            setTimeout(() => {
                this.availableContacts = [
                    { id: 1, name: 'João Silva', phone: '5511999991111', group: 'new_customers' },
                    { id: 2, name: 'Maria Oliveira', phone: '5511999992222', group: 'existing_customers' },
                    { id: 3, name: 'Pedro Santos', phone: '5511999993333', group: 'existing_customers' },
                    { id: 4, name: 'Ana Costa', phone: '5511999994444', group: 'inactive' },
                    { id: 5, name: 'Carlos Ferreira', phone: '5511999995555', group: 'new_customers' },
                    { id: 6, name: 'Juliana Lima', phone: '5511999996666', group: 'inactive' },
                    { id: 7, name: 'Roberto Alves', phone: '5511999997777', group: 'existing_customers' },
                    { id: 8, name: 'Fernanda Martins', phone: '5511999998888', group: 'new_customers' }
                ];
            }, 1000);
        },
        
        get filteredCampaigns() {
            return this.campaigns.filter(campaign => {
                // Filtrar por status
                if (this.filters.status !== 'all' && campaign.status !== this.filters.status) {
                    return false;
                }
                
                // Filtrar por texto de busca
                if (this.filters.search && !campaign.name.toLowerCase().includes(this.filters.search.toLowerCase()) && 
                    !campaign.description.toLowerCase().includes(this.filters.search.toLowerCase())) {
                    return false;
                }
                
                return true;
            });
        },
        
        get filteredContacts() {
            // Filtrar contatos com base no target_audience selecionado
            if (this.currentCampaign.target_audience === 'all') {
                return this.availableContacts;
            }
            
            return this.availableContacts.filter(contact => 
                contact.group === this.currentCampaign.target_audience
            );
        },
        
        createNewCampaign() {
            this.currentCampaign = {
                id: null,
                name: '',
                description: '',
                message: '',
                status: 'draft',
                scheduled_date: '',
                scheduled_time: '',
                target_audience: 'all',
                recipients: [],
                media_url: '',
                has_media: false
            };
            this.selectedContacts = [];
            this.showNewCampaignForm = true;
            this.showEditCampaignForm = false;
        },
        
        editCampaign(campaignId) {
            const campaign = this.campaigns.find(c => c.id === campaignId);
            if (campaign) {
                this.currentCampaign = JSON.parse(JSON.stringify(campaign)); // Clone para evitar edição direta
                this.selectedContacts = this.currentCampaign.recipients || [];
                this.showEditCampaignForm = true;
                this.showNewCampaignForm = false;
            }
        },
        
        saveCampaign() {
            this.saving = true;
            this.success = null;
            this.error = null;
            
            // Validar campos obrigatórios
            if (!this.currentCampaign.name || !this.currentCampaign.message) {
                this.error = 'Nome da campanha e mensagem são obrigatórios.';
                this.saving = false;
                return;
            }
            
            // Adicionar contatos selecionados
            this.currentCampaign.recipients = this.selectedContacts;
            
            // Em produção, enviar dados para a API
            // Simulação para demonstração
            setTimeout(() => {
                if (this.currentCampaign.id) {
                    // Atualizar campanha existente
                    const index = this.campaigns.findIndex(c => c.id === this.currentCampaign.id);
                    if (index !== -1) {
                        this.campaigns[index] = { ...this.currentCampaign };
                    }
                } else {
                    // Criar nova campanha
                    const newId = Math.max(...this.campaigns.map(c => c.id), 0) + 1;
                    this.campaigns.push({
                        ...this.currentCampaign,
                        id: newId,
                        created_at: new Date().toISOString(),
                        sent_count: 0,
                        delivered_count: 0,
                        read_count: 0,
                        response_count: 0
                    });
                }
                
                this.saving = false;
                this.success = 'Campanha salva com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                    this.showNewCampaignForm = false;
                    this.showEditCampaignForm = false;
                }, 3000);
            }, 1500);
        },
        
        cancelEdit() {
            this.showNewCampaignForm = false;
            this.showEditCampaignForm = false;
            this.error = null;
        },
        
        deleteCampaign(campaignId) {
            if (confirm('Tem certeza que deseja excluir esta campanha?')) {
                // Em produção, enviar solicitação para a API
                // Simulação para demonstração
                this.campaigns = this.campaigns.filter(c => c.id !== campaignId);
                this.success = 'Campanha excluída com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }
        },
        
        duplicateCampaign(campaignId) {
            const campaign = this.campaigns.find(c => c.id === campaignId);
            if (campaign) {
                const newId = Math.max(...this.campaigns.map(c => c.id), 0) + 1;
                const duplicatedCampaign = {
                    ...JSON.parse(JSON.stringify(campaign)),
                    id: newId,
                    name: `Cópia de ${campaign.name}`,
                    status: 'draft',
                    scheduled_date: '',
                    scheduled_time: '',
                    sent_count: 0,
                    delivered_count: 0,
                    read_count: 0,
                    response_count: 0,
                    created_at: new Date().toISOString()
                };
                
                this.campaigns.push(duplicatedCampaign);
                this.success = 'Campanha duplicada com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }
        },
        
        toggleContactSelection(contactId) {
            const index = this.selectedContacts.findIndex(c => c.id === contactId);
            const contact = this.availableContacts.find(c => c.id === contactId);
            
            if (index === -1 && contact) {
                this.selectedContacts.push(contact);
            } else {
                this.selectedContacts.splice(index, 1);
            }
        },
        
        isContactSelected(contactId) {
            return this.selectedContacts.some(c => c.id === contactId);
        },
        
        selectAllContacts() {
            this.selectedContacts = [...this.filteredContacts];
        },
        
        deselectAllContacts() {
            this.selectedContacts = [];
        },
        
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        },
        
        getStatusClass(status) {
            switch (status) {
                case 'active': return 'bg-green-100 text-green-800';
                case 'scheduled': return 'bg-blue-100 text-blue-800';
                case 'completed': return 'bg-gray-100 text-gray-800';
                case 'draft': return 'bg-yellow-100 text-yellow-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        },
        
        getStatusText(status) {
            switch (status) {
                case 'active': return 'Ativa';
                case 'scheduled': return 'Agendada';
                case 'completed': return 'Concluída';
                case 'draft': return 'Rascunho';
                default: return status;
            }
        },
        
        getAudienceText(audience) {
            switch (audience) {
                case 'all': return 'Todos os contatos';
                case 'new_customers': return 'Novos clientes';
                case 'existing_customers': return 'Clientes existentes';
                case 'inactive': return 'Clientes inativos';
                default: return audience;
            }
        }
    }));
});
