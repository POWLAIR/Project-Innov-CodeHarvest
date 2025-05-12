'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { PixelInput, PixelButton } from '@/shared/PixelFormComponents';

const LoginPage = () => {
    const [authError, setAuthError] = useState<string | null>(null);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pixel-pattern" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20" />
            
            <div className="glass-effect p-8 w-full max-w-md rounded-2xl relative z-10">
                <div className="flex justify-center mb-6">
                    <Image 
                        src="/codeharvest-logo.png" 
                        alt="Logo" 
                        width={80} 
                        height={80}
                        className="glow rounded-2xl" 
                    />
                </div>
                <h1 className="text-center text-white text-3xl font-bold mb-8 pixel-font">Connexion</h1>
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
                        <Form className="flex flex-col gap-6">
                            <div>
                                <label htmlFor="email" className="text-white/90 font-medium text-sm mb-1 block">Email</label>
                                <Field name="email" type="email" as={PixelInput} />
                                <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-white/90 font-medium text-sm mb-1 block">Mot de passe</label>
                                <Field name="password" type="password" as={PixelInput} />
                                <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
                            </div>

                            {authError && <div className="text-red-400 text-sm text-center font-medium">{authError}</div>}

                            <PixelButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Connexion...' : 'Se connecter'}
                            </PixelButton>

                            <p className="text-center text-white/80 text-sm">
                                Pas encore de compte ?{' '}
                                <Link href="/signup" className="text-indigo-300 hover:text-indigo-200 hover-scale inline-block">
                                    S'inscrire
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;