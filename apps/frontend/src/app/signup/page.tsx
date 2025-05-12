'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { PixelInput, PixelButton } from '@/shared/PixelFormComponents';

const SignupPage = () => {
    const [signupError, setSignupError] = useState<string | null>(null);

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
                <h1 className="text-center text-white text-3xl font-bold mb-8 pixel-font">Inscription</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Email invalide').required('Requis'),
                        password: Yup.string().min(6, 'Minimum 6 caractères').required('Requis'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setSignupError(null);
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    query: `
                    mutation Register($data: RegisterInput!) {
                      registerUser(data: $data) {
                        token
                      }
                    }
                  `,
                                    variables: { data: values },
                                }),
                            });

                            const data = await res.json();
                            if (data.errors) throw new Error(data.errors[0].message);

                            localStorage.setItem('token', data.data.registerUser.token);
                            window.location.href = '/dashboard';
                        } catch (error) {
                            setSignupError(error instanceof Error ? error.message : "Erreur inconnue lors de l'inscription");
                        } finally {
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

                            {signupError && <div className="text-red-400 text-sm text-center font-medium">{signupError}</div>}

                            <PixelButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Inscription...' : "S'inscrire"}
                            </PixelButton>

                            <p className="text-center text-white/80 text-sm">
                                Déjà un compte ?{' '}
                                <Link href="/login" className="text-indigo-300 hover:text-indigo-200 hover-scale inline-block">
                                    Se connecter
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignupPage;