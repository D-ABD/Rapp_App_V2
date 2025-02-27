// src/components/Signup.tsx
import { useState } from "react";
import { signUp } from "../supabaseClient";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await signUp(email, password); // ✅ Suppression de `data`
        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Inscription réussie ! Vérifiez votre email.");
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Créer un compte</h2>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default SignUp;
