import { useEffect } from "react";// Importa o hook useEffect do React para efeitos colaterais
import GoogleLoginButton from "../components/GoogleLoginButton";// Importa o componente de botão de login do Google
import { useAuth } from "../context/AuthContext";// Importa o contexto de autenticação para acessar o estado de autenticação
import { useNavigate } from "react-router";// Importa o hook useNavigate do React Router para navegação


const Login = () => {// Componente de Login
    // Importa o hook useAuth para acessar o contexto de autenticação

    const { signWithGoogle, authState } = useAuth();// Importa o contexto de autenticação

    const navigate = useNavigate();// Importa o hook useNavigate do React Router para navegação

    const handleLogin = async () => {// Função para lidar com o login
        // Tenta fazer o login com o Google e captura erros
        try {
            await signWithGoogle();// Chama a função de login com o Google do contexto de autenticação
            // Se o login for bem-sucedido, o usuário será redirecionado para o dashboard pelo useEffect
        } catch (err) {// Captura erros durante o login
            // Se ocorrer um erro, exibe uma mensagem de erro no console
            console.error("Erro ao fazer login com o Google", err);// Exibe o erro no console
            // Atualiza o estado de erro no contexto de autenticação
        }
    };
    
    useEffect(() => {// Efeito colateral para redirecionar o usuário após o login
        // Se o usuário já estiver autenticado e não estiver carregando, redireciona para o dashboard
        if (authState.user && !authState.loading) {// Verifica se o usuário está autenticado e se o estado de carregamento é falso
            navigate('/dashboard');
        }
    }, [authState.user, authState.loading, navigate]);

    return (// Renderiza a página de login
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <header>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">DevBills</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">Gerencie suas finanças de forma simples e eficiente</p>
                </header>

                <main className="mt-8 bg-white py-8 px-4 shadw-md rounded-lg sm:px-10 spacey-y-6">
                    <section className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900">Faça login paracontinuar</h2>
                        <p className="mt-1 text-sm text-gray-600">Acesse sua conta para começar a gerenciar suas finanças</p>
                    </section>

                    <GoogleLoginButton onClick={handleLogin} isLoading={false} />
                    {authState.error && (// Exibe mensagem de erro se houver um erro de autenticação
                        // Verifica se authState.error existe e exibe a mensagem de erro
                        <div className="bg-red-50 text-center text-red-700 mt-4">
                            <p>{authState.error} Erro no sistema</p>
                        </div>
                    )}
                    <footer className="mt-6">
                        <p className="mt-1 text-sm text-gray-600 text-center">Ao fazer login, você concorda com nossos termos de uso e politica de privacidade.</p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Login;// Exporta o componente Login para ser usado em outras partes da aplicação
// Exporta o componente Login para ser usado em outras partes da aplicação