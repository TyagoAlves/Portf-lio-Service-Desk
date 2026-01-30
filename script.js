// Navegação entre páginas
let currentPath = ['portfolio'];

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPath.push(page);
        updateBreadcrumb();
    } else {
        // Se a página não existe, voltar para o portfólio
        document.getElementById('portfolio-page').classList.add('active');
        currentPath = ['portfolio'];
        updateBreadcrumb();
        alert('Módulo não disponível. Voltando ao início.');
    }
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = '';
    
    currentPath.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = 'breadcrumb-item';
        span.textContent = getPageTitle(item);
        
        if (index === currentPath.length - 1) {
            span.classList.add('active');
        } else {
            span.onclick = () => navigateToIndex(index);
        }
        
        breadcrumb.appendChild(span);
        
        if (index < currentPath.length - 1) {
            const separator = document.createElement('span');
            separator.textContent = ' / ';
            separator.style.color = '#bdc3c7';
            breadcrumb.appendChild(separator);
        }
    });
}

function navigateToIndex(index) {
    currentPath = currentPath.slice(0, index + 1);
    const targetPage = currentPath[currentPath.length - 1];
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPageElement = document.getElementById(targetPage + '-page');
    
    if (targetPageElement) {
        targetPageElement.classList.add('active');
    } else {
        // Se a página não existe, voltar para o portfólio
        document.getElementById('portfolio-page').classList.add('active');
        currentPath = ['portfolio'];
    }
    
    updateBreadcrumb();
}

function getPageTitle(page) {
    const titles = {
        'portfolio': 'Portfólio',
        'acesso': 'Acesso',
        'usuario': 'Usuário',
        'acesso-remoto-funcionarios': 'Acesso remoto (funcionários)',
        'acesso-remoto-terceirizados': 'Acesso remoto (terceirizados)',
        'adobe-sign': 'Adobe Sign',
        'autenticacao-multifator': 'Autenticação Multifator - MFA',
        'controle-acesso': 'Controle de Acesso',
        'email': 'E-mail',
        'internet': 'Internet',
        'wireless': 'Wireless',
        'equipamentos': 'Equipamentos & Softwares',
        'projetos': 'Projetos',
        'datacenter': 'Serviços de Datacenter',
        'rede-cabeamento': 'Serviços de Rede e Cabeamento',
        'sistemas': 'Sistemas',
        'telefonia-fixa': 'Telefonia Fixa',
        'telefonia-movel': 'Telefonia Móvel'
    };
    return titles[page] || page;
}

// Guias de preenchimento
function showGuide(guideType) {
    const modal = document.getElementById('guide-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = getGuideTitle(guideType);
    modalBody.innerHTML = getGuideContent(guideType);
    
    modal.style.display = 'block';
    
    // Adicionar botões de edição se for admin
    if (isAdmin) {
        setTimeout(() => {
            const templateBox = modalBody.querySelector('.template-box');
            if (templateBox && !templateBox.querySelector('.edit-btn')) {
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.innerHTML = '✏️ Editar';
                editBtn.onclick = () => editTemplate(guideType);
                templateBox.appendChild(editBtn);
            }
        }, 100);
    }
}

function closeModal() {
    document.getElementById('guide-modal').style.display = 'none';
}

function getGuideTitle(guideType) {
    // Verificar se existe título customizado salvo
    const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    if (savedTemplates[guideType] && savedTemplates[guideType].title) {
        return savedTemplates[guideType].title;
    }
    
    // Usar títulos padrão se não houver customização
    const titles = {
        'criar-empregado': 'Criar Usuário - Empregado',
        'criar-jovem-aprendiz': 'Criar Usuário - Jovem Aprendiz',
        'criar-terceirizado': 'Criar Usuário - Terceirizado',
        'ativar-desativar': 'Ativar/Desativar Usuário',
        'desbloquear': 'Desbloquear Usuário',
        'modificar': 'Modificar Usuário',
        'bloquear-desbloquear-funcionario': 'Bloquear/Desbloquear Acesso Remoto - Empregado',
        'configurar-funcionario': 'Configurar Acesso Remoto - Empregado',
        'criar-excluir-funcionario': 'Criar/Excluir Acesso Remoto - Empregado',
        'reportar-falha-funcionario': 'Reportar Falha Acesso Remoto - Empregado',
        'auditoria-terceirizado': 'Auditoria Acesso Remoto - Terceirizado',
        'bloquear-desbloquear-terceirizado': 'Bloquear/Desbloquear Acesso Remoto - Terceirizado',
        'configurar-terceirizado': 'Configurar Acesso Remoto - Terceirizado',
        'criar-excluir-terceirizado': 'Criar/Excluir Acesso Remoto - Terceirizado',
        'reportar-falha-terceirizado': 'Reportar Falha Acesso Remoto - Terceirizado',
        'liberar-bloquear-adobe': 'Liberar/Bloquear Adobe Sign',
        'grupos-liberar-bloquear': 'Grupos - Liberar/Bloquear',
        'senha-alterar': 'Senha - alterar',
        'ativar-desativar-empregado': 'Ativar/Desativar - Empregado',
        'ativar-desativar-terceirizado': 'Ativar/Desativar - Terceirizado', 
        'ativar-desativar-jovem-aprendiz': 'Ativar/Desativar - Jovem Aprendiz',
        'desbloquear-empregado': 'Desbloquear - Empregado',
        'desbloquear-terceirizado': 'Desbloquear - Terceirizado',
        'desbloquear-jovem-aprendiz': 'Desbloquear - Jovem Aprendiz',
        'grupos-liberar-bloquear-empregado': 'Grupos - Empregado',
        'grupos-liberar-bloquear-terceirizado': 'Grupos - Terceirizado',
        'grupos-liberar-bloquear-jovem-aprendiz': 'Grupos - Jovem Aprendiz',
        'modificar-empregado': 'Modificar - Empregado',
        'modificar-terceirizado': 'Modificar - Terceirizado',
        'modificar-jovem-aprendiz': 'Modificar - Jovem Aprendiz',
        'senha-alterar-empregado': 'Senha - Empregado',
        'senha-alterar-terceirizado': 'Senha - Terceirizado',
        'senha-alterar-jovem-aprendiz': 'Senha - Jovem Aprendiz',
        'criar-mfa': 'Criar MFA',
        'desbloquear-mfa': 'Desbloquear MFA',
        'modificar-mfa': 'Modificar MFA',
        'criar-controle-acesso': 'Criar Controle de Acesso',
        'ativar-desativar-controle-acesso': 'Ativar/Desativar Controle de Acesso',
        'modificar-controle-acesso': 'Modificar Controle de Acesso',
        'criar-email': 'Criar E-mail',
        'ativar-desativar-email': 'Ativar/Desativar E-mail',
        'modificar-email': 'Modificar E-mail',
        'criar-internet': 'Criar Internet',
        'ativar-desativar-internet': 'Ativar/Desativar Internet',
        'modificar-internet': 'Modificar Internet',
        'criar-wireless': 'Criar Wireless',
        'ativar-desativar-wireless': 'Ativar/Desativar Wireless',
        'modificar-wireless': 'Modificar Wireless'
    };
    return titles[guideType] || 'Guia de Preenchimento';
}

function getGuideContent(guideType) {
    // Verificar se existe template customizado salvo
    const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    if (savedTemplates[guideType]) {
        const custom = savedTemplates[guideType];
        return `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <div>${custom.instructions}</div>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyCustomTemplate('${guideType}')">📋 Copiar</button>
${custom.template}
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `;
    }
    
    // Usar templates padrão se não houver customização
    const guides = {
        
        'criar-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Criar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet para outro empregado

MATRÍCULA:
NOME:
E-MAIL: matricula@cxxxxx.com.br
SETOR:
CPF:
RG:
DATA DE NASCIMENTO:
DATA DE ADMISSÃO:
MATRÍCULA ESPELHO:

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'criar-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Criar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet e E-mail Parceiro para Jovem Aprendiz

MATRÍCULA DO EMPREGADO SOLICITANTE(Para aprovação do gestor):
NOME COMPLETO:
MATRÍCULA:
CPF:
RG:
DATA DE NASCIMENTO:
E-MAIL: matricula@parceiro.cxxxxx.com.br
ESPELHO:
EMPRESA:
VALIDADE:

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'criar-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Criar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet e E-mail Parceiro para Terceirizado

MATRÍCULA DO EMPREGADO SOLICITANTE(Para aprovação do gestor):
NOME COMPLETO:
CARGO:
CPF:
RG:
DATA DE NASCIMENTO:
E-MAIL:
ESPELHO:
EMPRESA:
CONTRATO:
VALIDADE:

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'ativar-desativar-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Matricula / Nome completo do solicitante</li>
                        <li><strong>Importante:</strong> É necessário o ASO para ativação por licença, caso o empregado não tenha, entrar em contato com o RG</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Ativar/Desativar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-ativar-desativar-empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'ativar-desativar-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante / UserName</li>
                        <li><strong>Importante:</strong> Matricula de empregado para aprovação do gestor</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Criar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-ativar-desativar-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'ativar-desativar-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Ativar/Desativar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-ativar-desativar-jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'desbloquear-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Desbloquear</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-desbloquear-empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'desbloquear-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Importante:</strong> Nome completo do impactado</li>
                        <li><strong>Matrícula:</strong> Matricula de empregado solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Desbloquear</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-desbloquear-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'desbloquear-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Desbloquear</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-desbloquear-jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'grupos-liberar-bloquear-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        
                        <li><strong>Solicitante:</strong> Matricula / Nome completo do solicitante</li>
                        <li><strong>Importante:</strong> É necessário o ASO para liberação, caso o empregado não tenha, entrar em contato com o RG</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Ativar/Desativar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-grupos-liberar-bloquear-empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'grupos-liberar-bloquear-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Criar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-grupos-liberar-bloquear-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'grupos-liberar-bloquear-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Ativar/Desativar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-grupos-liberar-bloquear-jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'modificar': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Modificar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('modificar')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">::-webkit-scrollbar: width: 10px;">::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando modificação de dados do usuário

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/departamento/cargo/telefone/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

Contato:
Área:</pre></pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'bloquear-desbloquear-funcionario': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (funcionários) > Bloquear/Desbloquear</li>
                        <li><strong>Encaminhar:</strong> Produção e Suporte</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('bloquear-desbloquear-funcionario')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [BLOQUEIO/DESBLOQUEIO] de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
MOTIVO: [segurança/desligamento/solicitação do gestor/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre></pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'configurar-funcionario': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (funcionários) > Configurar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('configurar-funcionario')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando configuração de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
CONFIGURAÇÃO SOLICITADA: [alteração de permissões/configuração de rede/outro]
DETALHES: [especificar as configurações necessárias]
JUSTIFICATIVA: [motivo da configuração]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'criar-excluir-funcionario': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (funcionários) > Criar/Excluir</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('criar-excluir-funcionario')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [CRIAÇÃO/EXCLUSÃO] de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
JUSTIFICATIVA DA GERÊNCIA: [justificativa da gerência]
NECESSIDADE DA LIBERAÇÃO: [necessidade da liberação]
DETALHAMENTO DAS APLICAÇÕES: [aplicações que serão acessadas]
PRAZO: [prazo de validade]
IP DA MÁQUINA: [IP da máquina a ser acessada]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'reportar-falha-funcionario': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (funcionários) > Reportar falha</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('reportar-falha-funcionario')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços reportando falha no acesso remoto para empregado

USUÁRIO AFETADO: [nome do usuário]
MATRÍCULA: [matrícula]
DESCRIÇÃO DA FALHA: [descrever detalhadamente o problema]
QUANDO OCORREU: [data e horário]
MENSAGEM DE ERRO: [se houver, transcrever a mensagem]
AÇÕES JÁ REALIZADAS: [tentativas de solução]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'auditoria-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (terceirizados) > Auditoria</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('auditoria-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando auditoria de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
PERÍODO DA AUDITORIA: [data início - data fim]
TIPO DE AUDITORIA: [acessos realizados/tentativas de acesso/relatório de atividades]
JUSTIFICATIVA: [motivo da auditoria]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'bloquear-desbloquear-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (terceirizados) > Bloquear/Desbloquear</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('bloquear-desbloquear-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [BLOQUEIO/DESBLOQUEIO] de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
MOTIVO: [segurança/fim de contrato/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'configurar-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (terceirizados) > Configurar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('configurar-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando configuração de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONFIGURAÇÃO SOLICITADA: [alteração de permissões/configuração de rede/outro]
DETALHES: [especificar as configurações necessárias]
JUSTIFICATIVA: [motivo da configuração]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'criar-excluir-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (terceirizados) > Criar/Excluir</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('criar-excluir-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [CRIAÇÃO/EXCLUSÃO] de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CARGO: [cargo do terceirizado]
CPF: [CPF do terceirizado]
RG: [RG do terceirizado]
DATA DE NASCIMENTO: [data de nascimento]
E-MAIL: [e-mail do terceirizado]
CONTRATO: [número do contrato]
VALIDADE: [data de validade do contrato]
ESPELHO: [usuário espelho]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'reportar-falha-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Acesso remoto (terceirizados) > Reportar falha</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('reportar-falha-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços reportando falha no acesso remoto para terceirizado

NOME AFETADO: [nome do terceirizado]
EMPRESA: [empresa terceirizada]
DESCRIÇÃO DA FALHA: [descrever detalhadamente o problema]
QUANDO OCORREU: [data e horário]
MENSAGEM DE ERRO: [se houver, transcrever a mensagem]
AÇÕES JÁ REALIZADAS: [tentativas de solução]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'liberar-bloquear-adobe': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Adobe Sign > Liberar/Bloquear</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('liberar-bloquear-adobe')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] do Adobe Sign

MATRÍCULA: [matrícula]
MATRÍCULA ESPELHO: [matrícula espelho obrigatória]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
OBSERVAÇÃO: Inclusão no grupo GRP_AdobeSign

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'grupos-liberar-bloquear': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Grupos - Liberar/Bloquear</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('grupos-liberar-bloquear')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] de grupo para usuário

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
GRUPO: [nome do grupo]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
PERMISSÕES: [detalhar permissões necessárias]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'modificar-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Modificar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-modificar-empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando modificação de dados do empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/departamento/cargo/telefone/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'modificar-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>E-mail:</strong> E-mail do solicitante</li>
                        <li><strong>Origem do contato:</strong> Service Desk</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Modificar</li>
                        <li><strong>Descrição:</strong> Use o template abaixo</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-modificar-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando modificação de dados de usuário terceirizado

NOME: [nome do terceirizado]
USERNAME: [Nome de usuário]
CAMPO A MODIFICAR: [nome/e-mail/empresa/contrato/validade/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

MATRÍCULA DE EMPREGADO(Para aprovação do gestor):
Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'modificar-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Solicitante:</strong> Nome completo</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Modificar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-modificar-jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando modificação de dados de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/empresa/contrato/validade/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

MATRÍCULA DE EMPREGADO(Para aprovação do gestor):
Contato:
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'senha-alterar-empregado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			<li><strong>Importante:</strong> Preencher dados pessoais e confirmar no sistema</li>
			<li><strong>Importante:</strong> O terceirizado só pode resetar a sua própria senha</li>
                        <li><strong>Solicitante:</strong> Matrícula</li>
			<li><strong>Importante:</strong> preencher dados pessoais</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Senha/Alterar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-senha-alterar-empregado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede do empregado(a).

MATRÍCULA: [matrícula]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'senha-alterar-terceirizado': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			<li><strong>Importante:</strong> Preencher dados pessoais e confirmar no sistema</li>
			<li><strong>Importante:</strong> O terceirizado só pode resetar a sua própria senha</li>
                        <li><strong>Solicitante:</strong> Nome completo do solicitante</li>
                        <li><strong>Solicitante:</strong> Matrícula</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Senha/Alterar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-senha-alterar-terceirizado')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede do terceirizado(a).

USUÁRIO: [nome do terceirizado(a)]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,

        'senha-alterar-jovem-aprendiz': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			<li><strong>Importante:</strong> Preencher dados pessoais e confirmar no sistema</li>
			<li><strong>Importante:</strong> O terceirizado só pode resetar a sua própria senha</li>
                        <li><strong>Solicitante:</strong> Matrícula</li>
                        <li><strong>Portfólio:</strong> Acesso > Usuário > Senha/Alterar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-senha-alterar-jovem-aprendiz')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede de usuário jovem aprendiz

MATRÍCULA: [matrícula]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'configurar-mfa': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
                        <li><strong>Importante:</strong> Preencher dados pessoais e confirmar no sistema</li>
                        <li><strong>Importante:</strong> O terceirizado só pode alterar seu próprio MFA</li>
                        <li><strong>Portfólio:</strong> Acesso > Autenticação Multifator - MFA > Configurar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-configurar-mfa')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando configuração de MFA

USUÁRIO: [matrícula / UserName]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório caso seja empregado(confirmar no sistema)]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'reportar-falha-mfa': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			            <li><strong>Importante:</strong> Preencher dados pessoais e confirmar no sistema</li>
			            <li><strong>Importante:</strong> O terceirizado só pode alterar seu próprio MFA</li>
                        <li><strong>Portfólio:</strong> Acesso > Reportar falha - MFA > Configurar</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-reportar-falha-mfa')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços reportando falha de MFA

USUÁRIO: [matrícula / UserName]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório caso seja empregado(confirmar no sistema)]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'acesso-liberar-bloquear-pasta': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			            <li><strong>Usuario</strong> UserName ou Matrícula</li>
			            <li><strong>Importante:</strong> Necessário o caminho completo da pasta "Exemplo: \\copanet04.copanet.copasa\publico"</li>
                        <li><strong>Importante:</strong> Necessário matrícula espelho(usuário que possui acesso a pasta)</li>
                        <li><strong>Portfólio:</strong> Acesso > Controle de Acesso - Ambiente/Pasta > Acesso - Liberar / Bloquear</li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-acesso-liberar-bloquear-pasta')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando acesso [liberar/bloquear] pasta de rede

CAMINHO DA PASTA: [caminho que começa com \\ "Exemplo: \\copanet04.copanet.copasa\publico"]
USUÁRIO: [matrícula / UserName]
MATRÍCULA ESPELHO: [matrícula de outro usuário com acesso a pasta]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `,
        'criar-pasta-de-rede': `
            <div class="guide-section">
                <h4>📋 Como preencher:</h4>
                <div class="required-fields">
                    <h5>⚠️ Campos obrigatórios:</h5>
                    <ul>
			            <li><strong>Usuario</strong> UserName ou Matrícula</li>
			            <li><strong>Importante:</strong> Necessário o caminho completo de onde ira ficar a pasta "Exemplo: \\copanet04.copanet.copasa\publico"</li>
                        <li><strong>Importante:</strong> Necessário aprovação do gerente aprovador</li>
                        <li><strong>Portfólio:</strong> Acesso > Controle de Acesso - Ambiente/Pasta > Criar pasta de rede </li>
                    </ul>
                </div>
                
                <h4>📝 Template para Descrição:</h4>
                <div class="template-box" style="max-height: 300px; overflow-y: auto; background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; position: relative;">
                    <button class="copy-btn" onclick="copyTemplate('copy-criar-pasta-de-rede')">📋 Copiar</button>
<pre style="font-family: inherit; white-space: pre-wrap; margin-bottom: -100px; padding-top: 10px;::-webkit-scrollbar: width: 10px;">Foi feito o contato com a Central de Serviços solicitando criação de pasta de rede

CAMINHO DA PASTA: [caminho que começa com \\ "Exemplo: \\copanet04.copanet.copasa\publico"]
USUÁRIO: [matrícula de empregado / UserName]

Contato: 
Área:</pre>
                </div>
                
                <div class="success-message" id="copy-success">
                    ✅ Template copiado para a área de transferência!
                </div>
            </div>
        `
    };
    return guides[guideType] || '<p>Guia não encontrado.</p>';
}

function copyCustomTemplate(templateType) {
    const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    if (savedTemplates[templateType]) {
        const template = savedTemplates[templateType].template;
        navigator.clipboard.writeText(template).then(() => {
            const successMsg = document.getElementById('copy-success');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }).catch(err => {
            alert('Erro ao copiar template. Tente selecionar e copiar manualmente.');
        });
    }
}

function copyTemplate(templateType) {
    const templates = {
        'empregado': `Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet para outro empregado

MATRÍCULA:
NOME:
E-MAIL: matricula@cxxxxx.com.br
SETOR:
CPF:
RG:
DATA DE NASCIMENTO:
DATA DE ADMISSÃO:
MATRÍCULA ESPELHO:

Contato:
Área:`,
        'jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet e E-mail Parceiro para Jovem Aprendiz

MATRÍCULA DO EMPREGADO SOLICITANTE(Para aprovação do gestor):
NOME COMPLETO:
MATRÍCULA:
CPF:
RG:
DATA DE NASCIMENTO:
E-MAIL: matricula@parceiro.cxxxxx.com.br
ESPELHO:
EMPRESA:
VALIDADE:

Contato:
Área:`,
        'terceirizado': `Foi feito o contato com a Central de Serviços solicitando criação de usuário xxxxxxnet e E-mail Parceiro para Terceirizado

MATRÍCULA DO EMPREGADO SOLICITANTE(Para aprovação do gestor):
NOME COMPLETO:
CARGO:
CPF:
RG:
DATA DE NASCIMENTO:
E-MAIL:
ESPELHO:
EMPRESA:
CONTRATO:
VALIDADE:

Contato:
Área:`,
        'copy-ativar-desativar-empregado': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'copy-ativar-desativar-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'copy-ativar-desativar-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'copy-desbloquear-empregado': `Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'copy-desbloquear-terceirizado': `Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'copy-desbloquear-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando desbloquear de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'copy-grupos-liberar-bloquear-empregado': `Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'copy-grupos-liberar-bloquear-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'copy-grupos-liberar-bloquear-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando [liberar/bloquear] grupo de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'modificar': `Foi feito o contato com a Central de Serviços solicitando modificação de dados do usuário

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/departamento/cargo/telefone/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

Contato:
Área:`,
        'bloquear-desbloquear-funcionario': `Foi feito o contato com a Central de Serviços solicitando [BLOQUEIO/DESBLOQUEIO] de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
MOTIVO: [segurança/desligamento/solicitação do gestor/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'configurar-funcionario': `Foi feito o contato com a Central de Serviços solicitando configuração de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
CONFIGURAÇÃO SOLICITADA: [alteração de permissões/configuração de rede/outro]
DETALHES: [especificar as configurações necessárias]
JUSTIFICATIVA: [motivo da configuração]

Contato:
Área:`,
        'criar-excluir-funcionario': `Foi feito o contato com a Central de Serviços solicitando [CRIAÇÃO/EXCLUSÃO] de acesso remoto para empregado

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
JUSTIFICATIVA DA GERÊNCIA: [justificativa da gerência]
NECESSIDADE DA LIBERAÇÃO: [necessidade da liberação]
DETALHAMENTO DAS APLICAÇÕES: [aplicações que serão acessadas]
PRAZO: [prazo de validade]
IP DA MÁQUINA: [IP da máquina a ser acessada]

Contato:
Área:`,
        'bloquear-desbloquear-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [BLOQUEIO/DESBLOQUEIO] de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
MOTIVO: [segurança/fim de contrato/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'configurar-terceirizado': `Foi feito o contato com a Central de Serviços solicitando configuração de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONFIGURAÇÃO SOLICITADA: [alteração de permissões/configuração de rede/outro]
DETALHES: [especificar as configurações necessárias]
JUSTIFICATIVA: [motivo da configuração]

Contato:
Área:`,
        'criar-excluir-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [CRIAÇÃO/EXCLUSÃO] de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CARGO: [cargo do terceirizado]
CPF: [CPF do terceirizado]
RG: [RG do terceirizado]
DATA DE NASCIMENTO: [data de nascimento]
E-MAIL: [e-mail do terceirizado]
CONTRATO: [número do contrato]
VALIDADE: [data de validade do contrato]
ESPELHO: [usuário espelho]

Contato:
Área:`,
        'reportar-falha-terceirizado': `Foi feito o contato com a Central de Serviços reportando falha no acesso remoto para terceirizado

NOME AFETADO: [nome do terceirizado]
EMPRESA: [empresa terceirizada]
DESCRIÇÃO DA FALHA: [descrever detalhadamente o problema]
QUANDO OCORREU: [data e horário]
MENSAGEM DE ERRO: [se houver, transcrever a mensagem]
AÇÕES JÁ REALIZADAS: [tentativas de solução]

Contato:
Área:`,
        'auditoria-terceirizado': `Foi feito o contato com a Central de Serviços solicitando auditoria de acesso remoto para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
PERÍODO DA AUDITORIA: [data início - data fim]
TIPO DE AUDITORIA: [acessos realizados/tentativas de acesso/relatório de atividades]
JUSTIFICATIVA: [motivo da auditoria]

Contato:
Área:`,
        'bloquear-desbloquear-adobe': `Foi feito o contato com a Central de Serviços solicitando [BLOQUEIO/DESBLOQUEIO] do Adobe Sign

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
E-MAIL: [e-mail do usuário]
MOTIVO: [desligamento/mudança de função/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'configurar-adobe': `Foi feito o contato com a Central de Serviços solicitando configuração do Adobe Sign

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
CONFIGURAÇÃO SOLICITADA: [alteração de permissões/grupo/outro]
DETALHES: [especificar as configurações necessárias]
JUSTIFICATIVA: [motivo da configuração]

Contato:
Área:`,
        'criar-excluir-adobe': `Foi feito o contato com a Central de Serviços solicitando [CRIAÇÃO/EXCLUSÃO] de acesso ao Adobe Sign

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
E-MAIL: [e-mail do usuário]
CARGO: [cargo do usuário]
JUSTIFICATIVA: [motivo da necessidade do Adobe Sign]
ÁREA SOLICITANTE: [área que solicita]

Contato:
Área:`,
        'reportar-falha-terceirizado': `Foi feito o contato com a Central de Serviços reportando falha no acesso remoto para terceirizado

NOME AFETADO: [nome do terceirizado]
EMPRESA: [empresa terceirizada]
DESCRIÇÃO DA FALHA: [descrever detalhadamente o problema]
QUANDO OCORREU: [data e horário]
MENSAGEM DE ERRO: [se houver, transcrever a mensagem]
AÇÕES JÁ REALIZADAS: [tentativas de solução]

Contato:
Área:`,
        'liberar-bloquear-adobe': `Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] do Adobe Sign

MATRÍCULA: [matrícula]
MATRÍCULA ESPELHO: [matrícula espelho obrigatória]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
OBSERVAÇÃO: Inclusão no grupo GRP_AdobeSign

Contato:
Área:`,
        'grupos-liberar-bloquear': `Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] de grupo para usuário

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
GRUPO: [nome do grupo]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
PERMISSÕES: [detalhar permissões necessárias]

Contato:
Área:`,
        'senha-alterar': `Foi feito o contato com a Central de Serviços solicitando alteração de senha

USUÁRIO: [nome do usuário]
MATRÍCULA: [matrícula]
TIPO DE SENHA: [xxxxxxnet/SAP/Sistema Interno]
MOTIVO: [esqueceu a senha/bloqueio/expiração/outro]
OBSERVAÇÃO: Acesse http://xetaxxxxxxxxxxxx para criar novas senhas

Contato:
Área:`,
        'ativar-desativar-empregado': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO: [retorno de licença/falta de logon por 2 meses/desligamento/outro]
JUSTIFICATIVA: [detalhar o motivo]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'ativar-desativar-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
CONTRATO: [número do contrato]
MOTIVO: [fim de contrato/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'ativar-desativar-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando [ATIVAÇÃO/DESATIVAÇÃO] de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
VALIDADE: [data de validade]
MOTIVO: [fim do programa/renovação/outro]
JUSTIFICATIVA: [detalhar o motivo]

Contato:
Área:`,
        'desbloquear-empregado': `Foi feito o contato com a Central de Serviços solicitando desbloqueio de usuário empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
MOTIVO DO BLOQUEIO: [senha incorreta/bloqueios frequentes/outro]
DETALHES: [informações adicionais sobre o problema]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'desbloquear-terceirizado': `Foi feito o contato com a Central de Serviços solicitando desbloqueio de usuário terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
MOTIVO DO BLOQUEIO: [senha incorreta/bloqueios frequentes/outro]
DETALHES: [informações adicionais sobre o problema]

Contato:
Área:`,
        'desbloquear-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando desbloqueio de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
MOTIVO DO BLOQUEIO: [senha incorreta/bloqueios frequentes/outro]
DETALHES: [informações adicionais sobre o problema]

Contato:
Área:`,
        'grupos-liberar-bloquear-empregado': `Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] de grupo para empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
GRUPO: [nome do grupo]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
PERMISSÕES: [detalhar permissões necessárias]
ESPELHO: [usuário espelho se necessário]

Contato:
Área:`,
        'grupos-liberar-bloquear-terceirizado': `Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] de grupo para terceirizado

NOME: [nome do terceirizado]
CPF: [CPF do terceirizado]
EMPRESA: [empresa terceirizada]
GRUPO: [nome do grupo]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
PERMISSÕES: [detalhar permissões necessárias]

Contato:
Área:`,
        'grupos-liberar-bloquear-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando [LIBERAÇÃO/BLOQUEIO] de grupo para jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
EMPRESA: [empresa parceira]
GRUPO: [nome do grupo]
JUSTIFICATIVA: [motivo da liberação/bloqueio]
PERMISSÕES: [detalhar permissões necessárias]

Contato:
Área:`,
        'copy-modificar-empregado': `Foi feito o contato com a Central de Serviços solicitando modificação de dados do empregado

USUÁRIO: [nome do empregado]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/departamento/cargo/telefone/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

Contato:
Área:`,
        'copy-modificar-terceirizado': `Foi feito o contato com a Central de Serviços solicitando modificação de dados de usuário terceirizado

NOME: [nome do terceirizado]
USERNAME: [Nome de usuário]
CAMPO A MODIFICAR: [nome/e-mail/empresa/contrato/validade/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

MATRÍCULA DE EMPREGADO(Para aprovação do gestor):
Contato:
Área:`,
        'copy-modificar-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando modificação de dados de usuário jovem aprendiz

NOME: [nome do jovem aprendiz]
MATRÍCULA: [matrícula]
CAMPO A MODIFICAR: [nome/e-mail/empresa/contrato/validade/outro]
VALOR ATUAL: [valor atual do campo]
NOVO VALOR: [novo valor desejado]
JUSTIFICATIVA: [motivo da alteração]

MATRÍCULA DE EMPREGADO(Para aprovação do gestor):
Contato:
Área:`,
        'copy-senha-alterar-empregado': `Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede do empregado(a).

MATRÍCULA: [matrícula]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:`,
        'copy-senha-alterar-terceirizado': `Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede do terceirizado(a).

USUÁRIO: [nome do terceirizado(a)]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:`,
        'copy-senha-alterar-jovem-aprendiz': `Foi feito o contato com a Central de Serviços solicitando alteração de senha de rede de usuário jovem aprendiz

MATRÍCULA: [matrícula]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório(confirmar no sistema)]

Contato: 
Área:`, 
    'reportar-falha-funcionario': `Foi feito o contato com a Central de Serviços reportando falha no acesso remoto para empregado

USUÁRIO AFETADO: [nome do usuário]
MATRÍCULA: [matrícula]
DESCRIÇÃO DA FALHA: [descrever detalhadamente o problema]
QUANDO OCORREU: [data e horário]
MENSAGEM DE ERRO: [se houver, transcrever a mensagem]
AÇÕES JÁ REALIZADAS: [tentativas de solução]

Contato:
Área:`,
    'copy-configurar-mfa': `Foi feito o contato com a Central de Serviços solicitando configuração de MFA

USUÁRIO: [matrícula / UserName]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório caso seja empregado(confirmar no sistema)]

Contato: 
Área:`,
    'copy-reportar-falha-mfa': `Foi feito o contato com a Central de Serviços reportando falha de MFA

USUÁRIO: [matrícula / UserName]
CPF: [preenchimento obrigatório(confirmar no sistema)]
DATA DE NACIMENTO.: [preenchimento obrigatório(confirmar no sistema)]
DATA DE ADMISSÃO: [preenchimento obrigatório caso seja empregado(confirmar no sistema)]

Contato: 
Área:`,
    'copy-acesso-liberar-bloquear-pasta': `Foi feito o contato com a Central de Serviços solicitando acesso [liberar/bloquear] pasta de rede

CAMINHO DA PASTA: [caminho que começa com \\ "Exemplo: \\copanet04.copanet.copasa\publico"]
USUÁRIO: [matrícula / UserName]
MATRÍCULA ESPELHO: [matrícula de outro usuário com acesso a pasta]

Contato: 
Área:`,
    'copy-criar-pasta-de-rede': `Foi feito o contato com a Central de Serviços solicitando criação de pasta de rede

CAMINHO DA PASTA: [caminho que começa com \\ "Exemplo: \\copanet04.copanet.copasa\publico"]
USUÁRIO: [matrícula de empregado / UserName]

Contato: 
Área:`
    };
    
    const template = templates[templateType];
    if (template) {
        navigator.clipboard.writeText(template).then(() => {
            const successMsg = document.getElementById('copy-success');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }).catch(err => {
            alert('Erro ao copiar template. Tente selecionar e copiar manualmente.');
        });
    }
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const guideModal = document.getElementById('guide-modal');
    const userTypeModal = document.getElementById('user-type-modal');
    
    if (event.target === guideModal) {
        closeModal();
    }
    if (event.target === userTypeModal) {
        userTypeModal.style.display = 'none';
    }
}

// Função para obter ID do módulo a partir do elemento
function getModuleIdFromElement(element) {
    const onclick = element.getAttribute('onclick');
    if (onclick) {
        const match = onclick.match(/navigateTo\('([^']+)'\)/);
        if (match) return match[1];
    }
    
    const h3 = element.querySelector('h3');
    if (h3) {
        const text = h3.textContent.toLowerCase();
        return text.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    
    return 'unknown';
}

// Função para aplicar módulos visíveis salvos
function applyVisibleModules() {
    const visibleModules = JSON.parse(localStorage.getItem('visibleModules') || '[]');
    
    visibleModules.forEach(moduleId => {
        const moduleElements = document.querySelectorAll('.service-card.hidden-module');
        moduleElements.forEach(element => {
            const elementId = getModuleIdFromElement(element);
            if (elementId === moduleId) {
                element.classList.remove('hidden-module');
                element.style.display = 'block';
                element.style.opacity = '1';
                const overlay = element.querySelector('.admin-overlay');
                if (overlay) overlay.remove();
            }
        });
    });
}

// Variável para armazenar a ação atual
let currentAction = '';

// Função para mostrar modal de seleção de tipo de usuário
function showUserTypeModal(action = 'criar') {
    currentAction = action;
    const questionElement = document.getElementById('user-type-question');
    
    const actionTexts = {
        'criar': 'Qual tipo de usuário você deseja criar?',
        'ativar-desativar': 'Qual tipo de usuário você deseja ativar/desativar?',
        'desbloquear': 'Qual tipo de usuário você deseja desbloquear?',
        'grupos-liberar-bloquear': 'Para qual tipo de usuário você deseja gerenciar grupos?',
        'modificar': 'Qual tipo de usuário você deseja modificar?',
        'senha-alterar': 'Para qual tipo de usuário você deseja alterar a senha?'
    };
    
    questionElement.textContent = actionTexts[action] || 'Selecione o tipo de usuário:';
    document.getElementById('user-type-modal').style.display = 'block';
}
function showUserTypeModal(action = 'ativar-desativar') {
    currentAction = action;
    const questionElement = document.getElementById('user-type-question');
    
    const actionTexts = {
        'criar': 'Qual tipo de usuário você deseja criar?',
        'ativar-desativar': 'Qual tipo de usuário você deseja ativar/desativar?',
        'desbloquear': 'Qual tipo de usuário você deseja desbloquear?',
        'grupos-liberar-bloquear': 'Para qual tipo de usuário você deseja gerenciar grupos?',
        'modificar': 'Qual tipo de usuário você deseja modificar?',
        'senha-alterar': 'Para qual tipo de usuário você deseja alterar a senha?'
    };
    
    questionElement.textContent = actionTexts[action] || 'Selecione o tipo de usuário:';
    document.getElementById('user-type-modal').style.display = 'block';
}

// Função para selecionar tipo de usuário
function selectUserType(type) {
    // 1. Fecha o modal de seleção
    document.getElementById('user-type-modal').style.display = 'none';
    
    // 2. Verifica a ação atual
    if (currentAction === 'criar') {
        // Padrão de criação: criar-empregado, criar-terceirizado...
        showGuide('criar-' + type);
    } 
    else if (currentAction === 'ativar-desativar') {
        // Padrão de ativação: ativar-desativar-empregado, etc.
        showGuide('ativar-desativar-' + type);
    }
    else {
        // 3. FALLBACK PARA TODAS AS OUTRAS AÇÕES (Desbloquear, Modificar, etc.)
        // Isso garante que desbloquear-empregado, modificar-terceirizado, etc. funcionem
        // Monta a chave: acao + traço + tipo (ex: desbloquear-empregado)
        const templateKey = currentAction + '-' + type;
        showGuide(templateKey);
    }
}

// Inicializar breadcrumb e aplicar módulos visíveis
document.addEventListener('DOMContentLoaded', function() {
    updateBreadcrumb();
    applyVisibleModules();
});

// Sistema de administração
let isAdmin = false;
let currentEditingTemplate = null;

function toggleAdmin() {
    if (isAdmin) {
        // Sair do modo admin
        isAdmin = false;
        document.getElementById('admin-toggle-btn').innerHTML = '<i class="fas fa-cog"></i> Admin';
        document.getElementById('admin-toggle-btn').style.background = '#e74c3c';
        hideAdminFeatures();
    } else {
        // Entrar no modo admin
        showAdminLogin();
    }
}

function hideAdminFeatures() {
    // Para usuários normais, ocultar módulos que não estão na lista de visíveis permanentes
    const visibleModules = JSON.parse(localStorage.getItem('visibleModules') || '[]');
    const hiddenModules = document.querySelectorAll('.hidden-module');
    
    hiddenModules.forEach(module => {
        const moduleId = getModuleIdFromElement(module);
        // Só ocultar se não estiver na lista de módulos visíveis permanentes
        if (!visibleModules.includes(moduleId)) {
            module.style.display = 'none';
        }
    });
    
    // Ocultar botão de gerenciar módulos
    document.getElementById('admin-modules-btn').style.display = 'none';
    
    // Ocultar overlays admin
    const overlays = document.querySelectorAll('.admin-overlay');
    overlays.forEach(overlay => overlay.style.display = 'none');
    
    // Ocultar botões de excluir
    const deleteButtons = document.querySelectorAll('.module-delete-btn');
    deleteButtons.forEach(btn => btn.style.display = 'none');
}

function closeAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'none';
    document.getElementById('admin-user').value = '';
    document.getElementById('admin-pass').value = '';
}

function showAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'block';
}

function adminLogin() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;
    
    if (user === 'admin' && pass === 'admin123') {
        isAdmin = true;
        closeAdminLogin();
        document.getElementById('admin-toggle-btn').innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair Admin';
        document.getElementById('admin-toggle-btn').style.background = '#27ae60';
        alert('✅ Login realizado com sucesso!');
        updateAdminView();
        showHiddenModules();
        addAdminOverlays();
    } else {
        alert('❌ Usuário ou senha incorretos!');
    }
}

function addAdminOverlays() {
    const hiddenModules = document.querySelectorAll('.hidden-module');
    hiddenModules.forEach(module => {
        if (!module.querySelector('.admin-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'admin-overlay';
            overlay.innerHTML = `
                <button class="show-btn" onclick="showModule(this)">Mostrar Módulo</button>
                <button class="add-service-btn" onclick="addService(this)">+ Adicionar Serviço</button>
            `;
            overlay.style.display = 'flex';
            module.appendChild(overlay);
        }
    });
    
    // Adicionar botões de excluir nos módulos visíveis
    const visibleModules = document.querySelectorAll('.service-card:not(.hidden-module)');
    visibleModules.forEach(module => {
        if (!module.querySelector('.module-delete-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'module-delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.onclick = () => deleteModuleConfirm(module);
            deleteBtn.style.display = 'block';
            module.appendChild(deleteBtn);
        }
    });
}

function showModule(button) {
    const module = button.closest('.service-card');
    const moduleId = getModuleIdFromElement(module);
    
    module.classList.remove('hidden-module');
    module.style.opacity = '1';
    const overlay = module.querySelector('.admin-overlay');
    if (overlay) overlay.remove();
    
    // Salvar permanentemente no localStorage
    const visibleModules = JSON.parse(localStorage.getItem('visibleModules') || '[]');
    if (!visibleModules.includes(moduleId)) {
        visibleModules.push(moduleId);
        localStorage.setItem('visibleModules', JSON.stringify(visibleModules));
    }
}

function addService(button) {
    const moduleName = button.closest('.service-card').querySelector('h3').textContent;
    const serviceName = prompt(`Nome do novo serviço para ${moduleName}:`);
    const serviceDesc = prompt('Descrição do serviço:');
    const template = prompt('Template do serviço:');
    
    if (serviceName && serviceDesc && template) {
        alert(`Serviço criado:\nNome: ${serviceName}\nDescrição: ${serviceDesc}\nTemplate: ${template}`);
    }
}

function deleteModuleConfirm(module) {
    const moduleName = module.querySelector('h3').textContent;
    if (confirm(`Excluir módulo "${moduleName}"?`)) {
        module.remove();
        alert('Módulo excluído!');
    }
}

function showHiddenModules() {
    if (isAdmin) {
        document.getElementById('admin-modules-btn').style.display = 'block';
        const hiddenModules = document.querySelectorAll('.hidden-module');
        hiddenModules.forEach(module => {
            module.style.display = 'block';
        });
    }
    // Sempre aplicar módulos visíveis salvos, independente do modo admin
    applyVisibleModules();
}

function showModuleManager() {
    document.getElementById('module-manager-modal').style.display = 'block';
    loadModuleList();
}

function closeModuleManager() {
    document.getElementById('module-manager-modal').style.display = 'none';
}

function loadModuleList() {
    const moduleList = document.getElementById('module-list');
    const modules = [
        { id: 'acesso', name: 'Acesso', visible: true },
        { id: 'usuario', name: 'Usuário', visible: true },
        { id: 'acesso-remoto-funcionarios', name: 'Acesso remoto (funcionários)', visible: true },
        { id: 'acesso-remoto-terceirizados', name: 'Acesso remoto (terceirizados)', visible: true },
        { id: 'adobe-sign', name: 'Adobe Sign', visible: false },
        { id: 'autenticacao-multifator', name: 'Autenticação Multifator - MFA', visible: false },
        { id: 'controle-acesso', name: 'Controle de Acesso', visible: false },
        { id: 'email', name: 'E-mail', visible: false },
        { id: 'internet', name: 'Internet', visible: false },
        { id: 'wireless', name: 'Wireless', visible: false },
        { id: 'equipamentos', name: 'Equipamentos & Softwares', visible: false },
        { id: 'projetos', name: 'Projetos', visible: false },
        { id: 'datacenter', name: 'Serviços de Datacenter', visible: false },
        { id: 'rede-cabeamento', name: 'Serviços de Rede e Cabeamento', visible: false },
        { id: 'sistemas', name: 'Sistemas', visible: false },
        { id: 'telefonia-fixa', name: 'Telefonia Fixa', visible: false },
        { id: 'telefonia-movel', name: 'Telefonia Móvel', visible: false }
    ];
    
    moduleList.innerHTML = '';
    modules.forEach(module => {
        const moduleItem = document.createElement('div');
        moduleItem.className = `module-item ${module.visible ? 'visible' : 'hidden'}`;
        moduleItem.innerHTML = `
            <span>${module.name}</span>
            <div class="module-controls">
                <button class="toggle-btn" onclick="toggleModule('${module.id}')">
                    ${module.visible ? 'Ocultar' : 'Mostrar'}
                </button>
                <button class="edit-btn" onclick="editModulePath('${module.id}')">✏️</button>
                <button class="delete-btn" onclick="deleteModule('${module.id}')">🗑️</button>
            </div>
        `;
        moduleList.appendChild(moduleItem);
    });
}

function toggleModule(moduleId) {
    const moduleCards = document.querySelectorAll(`[onclick*="${moduleId}"]`);
    const visibleModules = JSON.parse(localStorage.getItem('visibleModules') || '[]');
    
    moduleCards.forEach(card => {
        if (card.classList.contains('hidden-module') || card.style.display === 'none') {
            // Mostrar módulo
            card.classList.remove('hidden-module');
            card.style.display = 'block';
            card.style.opacity = '1';
            const overlay = card.querySelector('.admin-overlay');
            if (overlay) overlay.remove();
            
            // Adicionar à lista de visíveis
            if (!visibleModules.includes(moduleId)) {
                visibleModules.push(moduleId);
            }
        } else {
            // Ocultar módulo
            card.classList.add('hidden-module');
            card.style.opacity = '0.5';
            
            // Se for admin, adicionar overlay
            if (isAdmin && !card.querySelector('.admin-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'admin-overlay';
                overlay.innerHTML = `
                    <button class="show-btn" onclick="showModule(this)">Mostrar Módulo</button>
                    <button class="add-service-btn" onclick="addService(this)">+ Adicionar Serviço</button>
                `;
                overlay.style.display = 'flex';
                card.appendChild(overlay);
            }
            
            // Se não for admin, ocultar completamente
            if (!isAdmin) {
                card.style.display = 'none';
            }
            
            // Remover da lista de visíveis
            const index = visibleModules.indexOf(moduleId);
            if (index > -1) {
                visibleModules.splice(index, 1);
            }
        }
    });
    
    localStorage.setItem('visibleModules', JSON.stringify(visibleModules));
    loadModuleList();
}

function editModulePath(moduleId) {
    const newPath = prompt('Digite o novo caminho para o módulo:', moduleId);
    if (newPath && newPath !== moduleId) {
        alert(`Caminho alterado de "${moduleId}" para "${newPath}"`);
    }
}

function deleteModule(moduleId) {
    if (confirm(`Tem certeza que deseja excluir o módulo "${moduleId}"?`)) {
        const moduleCards = document.querySelectorAll(`[onclick*="${moduleId}"]`);
        moduleCards.forEach(card => card.remove());
        alert('Módulo excluído!');
        loadModuleList();
    }
}

function createNewModule() {
    const name = prompt('Nome do novo módulo:');
    const id = prompt('ID do módulo (sem espaços):');
    const description = prompt('Descrição:');
    
    if (name && id && description) {
        alert(`Novo módulo criado:\nNome: ${name}\nID: ${id}\nDescrição: ${description}`);
        loadModuleList();
    }
}

function updateAdminView() {
    // Função removida - botões são adicionados dinamicamente no showGuide
}

function editTemplate(guideType) {
    const modalBody = document.getElementById('modal-body');
    const templateBox = modalBody.querySelector('.template-box');
    const templateText = templateBox.textContent.split('📋 Copiar')[1].split('✏️ Editar')[0].trim();
    const title = getGuideTitle(guideType);
    const guideSection = modalBody.querySelector('.guide-section');
    const instructionsElement = guideSection.querySelector('.required-fields');
    const instructions = instructionsElement ? instructionsElement.textContent : '';
    
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-instructions').value = instructions;
    document.getElementById('edit-template').value = templateText;
    
    currentEditingTemplate = guideType;
    document.getElementById('admin-edit-modal').style.display = 'block';
}

function closeAdminEdit() {
    document.getElementById('admin-edit-modal').style.display = 'none';
    currentEditingTemplate = null;
}

function saveTemplate() {
    if (!currentEditingTemplate) return;
    
    const newTemplate = document.getElementById('edit-template').value;
    const newTitle = document.getElementById('edit-title').value;
    const newInstructions = document.getElementById('edit-instructions').value;
    
    // Atualizar o template no modal atual
    const modalBody = document.getElementById('modal-body');
    const templateBox = modalBody.querySelector('.template-box');
    if (templateBox) {
        const copyBtn = templateBox.querySelector('.copy-btn');
        const editBtn = templateBox.querySelector('.edit-btn');
        
        // Reconstruir o conteúdo do template box
        let newContent = copyBtn.outerHTML + '\n' + newTemplate;
        if (editBtn) newContent += editBtn.outerHTML;
        
        templateBox.innerHTML = newContent;
        
        // Recriar o botão de editar
        const newEditBtn = templateBox.querySelector('.edit-btn');
        if (newEditBtn) {
            newEditBtn.onclick = () => editTemplate(currentEditingTemplate);
        }
    }
    
    // Salvar permanentemente no localStorage
    const savedTemplates = JSON.parse(localStorage.getItem('customTemplates') || '{}');
    savedTemplates[currentEditingTemplate] = {
        title: newTitle,
        instructions: newInstructions,
        template: newTemplate
    };
    localStorage.setItem('customTemplates', JSON.stringify(savedTemplates));
    
    alert('✅ Template salvo permanentemente!');
    closeAdminEdit();
    
}