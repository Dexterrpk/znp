// Componente para gerenciamento de usuários (Admin)
document.addEventListener('alpine:init', () => {
    Alpine.data('adminSection', () => ({
        loading: false,
        saving: false,
        success: null,
        error: null,
        showNewUserForm: false,
        showEditUserForm: false,
        
        // Lista de usuários
        users: [],
        
        // Filtros
        filters: {
            role: 'all', // all, admin, user
            status: 'all', // all, active, inactive
            search: ''
        },
        
        // Usuário atual para edição
        currentUser: {
            id: null,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            is_admin: false,
            is_active: true,
            plan: 'free' // free, pro, enterprise
        },
        
        init() {
            this.loadUsers();
        },
        
        loadUsers() {
            this.loading = true;
            
            // Em produção, buscar usuários da API
            // Simulação para demonstração
            setTimeout(() => {
                this.users = [
                    {
                        id: 1,
                        name: 'Administrador',
                        email: 'admin@zynapse.com',
                        is_admin: true,
                        is_active: true,
                        plan: 'enterprise',
                        last_login: '2025-01-15T10:30:00Z',
                        created_at: '2024-12-01T09:00:00Z'
                    },
                    {
                        id: 2,
                        name: 'João Silva',
                        email: 'joao@empresa.com',
                        is_admin: false,
                        is_active: true,
                        plan: 'pro',
                        last_login: '2025-01-14T14:45:00Z',
                        created_at: '2024-12-10T11:20:00Z'
                    },
                    {
                        id: 3,
                        name: 'Maria Oliveira',
                        email: 'maria@empresa.com',
                        is_admin: false,
                        is_active: true,
                        plan: 'free',
                        last_login: '2025-01-10T09:15:00Z',
                        created_at: '2024-12-15T10:30:00Z'
                    },
                    {
                        id: 4,
                        name: 'Pedro Santos',
                        email: 'pedro@empresa.com',
                        is_admin: false,
                        is_active: false,
                        plan: 'free',
                        last_login: '2024-12-20T16:30:00Z',
                        created_at: '2024-12-18T14:00:00Z'
                    },
                    {
                        id: 5,
                        name: 'Ana Costa',
                        email: 'ana@empresa.com',
                        is_admin: true,
                        is_active: true,
                        plan: 'enterprise',
                        last_login: '2025-01-15T08:45:00Z',
                        created_at: '2024-12-05T13:20:00Z'
                    }
                ];
                this.loading = false;
            }, 1000);
        },
        
        get filteredUsers() {
            return this.users.filter(user => {
                // Filtrar por papel (role)
                if (this.filters.role === 'admin' && !user.is_admin) {
                    return false;
                }
                if (this.filters.role === 'user' && user.is_admin) {
                    return false;
                }
                
                // Filtrar por status
                if (this.filters.status === 'active' && !user.is_active) {
                    return false;
                }
                if (this.filters.status === 'inactive' && user.is_active) {
                    return false;
                }
                
                // Filtrar por texto de busca
                if (this.filters.search && !user.name.toLowerCase().includes(this.filters.search.toLowerCase()) && 
                    !user.email.toLowerCase().includes(this.filters.search.toLowerCase())) {
                    return false;
                }
                
                return true;
            });
        },
        
        createNewUser() {
            this.currentUser = {
                id: null,
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                is_admin: false,
                is_active: true,
                plan: 'free'
            };
            this.showNewUserForm = true;
            this.showEditUserForm = false;
            this.error = null;
        },
        
        editUser(userId) {
            const user = this.users.find(u => u.id === userId);
            if (user) {
                this.currentUser = {
                    ...JSON.parse(JSON.stringify(user)), // Clone para evitar edição direta
                    password: '',
                    confirmPassword: ''
                };
                this.showEditUserForm = true;
                this.showNewUserForm = false;
                this.error = null;
            }
        },
        
        saveUser() {
            this.saving = true;
            this.success = null;
            this.error = null;
            
            // Validar campos obrigatórios
            if (!this.currentUser.name || !this.currentUser.email) {
                this.error = 'Nome e e-mail são obrigatórios.';
                this.saving = false;
                return;
            }
            
            // Validar formato de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.currentUser.email)) {
                this.error = 'Formato de e-mail inválido.';
                this.saving = false;
                return;
            }
            
            // Validar senha para novos usuários
            if (!this.currentUser.id) {
                if (!this.currentUser.password) {
                    this.error = 'Senha é obrigatória para novos usuários.';
                    this.saving = false;
                    return;
                }
                
                if (this.currentUser.password.length < 8) {
                    this.error = 'A senha deve ter pelo menos 8 caracteres.';
                    this.saving = false;
                    return;
                }
                
                if (this.currentUser.password !== this.currentUser.confirmPassword) {
                    this.error = 'As senhas não coincidem.';
                    this.saving = false;
                    return;
                }
            } else if (this.currentUser.password) {
                // Validar senha para usuários existentes (apenas se fornecida)
                if (this.currentUser.password.length < 8) {
                    this.error = 'A senha deve ter pelo menos 8 caracteres.';
                    this.saving = false;
                    return;
                }
                
                if (this.currentUser.password !== this.currentUser.confirmPassword) {
                    this.error = 'As senhas não coincidem.';
                    this.saving = false;
                    return;
                }
            }
            
            // Em produção, enviar dados para a API
            // Simulação para demonstração
            setTimeout(() => {
                if (this.currentUser.id) {
                    // Atualizar usuário existente
                    const index = this.users.findIndex(u => u.id === this.currentUser.id);
                    if (index !== -1) {
                        // Remover campos de senha da atualização
                        const { password, confirmPassword, ...userToUpdate } = this.currentUser;
                        this.users[index] = userToUpdate;
                    }
                } else {
                    // Criar novo usuário
                    const newId = Math.max(...this.users.map(u => u.id), 0) + 1;
                    // Remover campo de confirmação de senha
                    const { confirmPassword, ...newUser } = this.currentUser;
                    this.users.push({
                        ...newUser,
                        id: newId,
                        created_at: new Date().toISOString(),
                        last_login: null
                    });
                }
                
                this.saving = false;
                this.success = this.currentUser.id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                    this.showNewUserForm = false;
                    this.showEditUserForm = false;
                }, 3000);
            }, 1500);
        },
        
        cancelEdit() {
            this.showNewUserForm = false;
            this.showEditUserForm = false;
            this.error = null;
        },
        
        toggleUserStatus(userId) {
            const user = this.users.find(u => u.id === userId);
            if (user) {
                // Em produção, enviar solicitação para a API
                // Simulação para demonstração
                user.is_active = !user.is_active;
                this.success = `Usuário ${user.is_active ? 'ativado' : 'desativado'} com sucesso!`;
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }
        },
        
        deleteUser(userId) {
            if (confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
                // Em produção, enviar solicitação para a API
                // Simulação para demonstração
                this.users = this.users.filter(u => u.id !== userId);
                this.success = 'Usuário excluído com sucesso!';
                
                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => {
                    this.success = null;
                }, 3000);
            }
        },
        
        formatDate(dateString) {
            if (!dateString) return 'Nunca';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        },
        
        getPlanBadgeClass(plan) {
            switch (plan) {
                case 'free': return 'bg-gray-100 text-gray-800';
                case 'pro': return 'bg-blue-100 text-blue-800';
                case 'enterprise': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        },
        
        getPlanText(plan) {
            switch (plan) {
                case 'free': return 'Gratuito';
                case 'pro': return 'Profissional';
                case 'enterprise': return 'Empresarial';
                default: return plan;
            }
        }
    }));
});
