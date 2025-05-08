'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const PixelButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        className="bg-yellow-500 text-black px-4 py-2 border-4 border-black rounded-none shadow-lg hover:bg-yellow-400 active:translate-y-1 transition-transform duration-100"
    >
        {children}
    </button>
);

const PixelInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full bg-white text-black border-4 border-black px-2 py-1 font-mono text-sm shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 "
    />
);

const LoginPage = () => {
    const [authError, setAuthError] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 pixel-pattern p-4">
            <Image src="/codeharvest-logo.png" alt="Logo" width={100} height={100} className="mb-6" />
            <h1 className="text-4xl font-bold text-black mb-6 font-mono">Connexion à ta ferme</h1>

            <div className="bg-white border-4 border-black p-6 w-full max-w-sm shadow-xl">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Email invalide').required('Requis'),
                        password: Yup.string().min(6, 'Minimum 6 caractères').required('Requis'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setAuthError(null);
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    query: `
                    mutation Login($data: LoginInput!) {
                      login(data: $data) {
                        token
                      }
                    }
                  `,
                                    variables: { data: values },
                                }),
                            });

                            const json = await res.json();
                            if (json.errors) {
                                setAuthError(json.errors[0]?.message || 'Erreur inconnue');
                                setSubmitting(false);
                                return;
                            }

                            localStorage.setItem('token', json.data.login.token);
                            window.location.href = '/dashboard';
                        } catch {
                            setAuthError('Erreur de connexion au serveur');
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="email" className="font-bold block mb-1">Email</label>
                                <Field name="email" type="email" as={PixelInput} />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="font-bold block mb-1">Mot de passe</label>
                                <Field name="password" type="password" as={PixelInput} />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {authError && <div className="text-red-600 text-sm font-bold">{authError}</div>}

                            <PixelButton type="submit" disabled={isSubmitting}>
                                Connexion
                            </PixelButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
