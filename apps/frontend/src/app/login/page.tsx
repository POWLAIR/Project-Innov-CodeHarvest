// app/login/page.tsx
'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { PixelInput, PixelButton } from '@/shared/PixelFormComponents';

const LoginPage = () => {
    const [authError, setAuthError] = useState<string | null>(null);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-[#0e1616] bg-repeat"
            style={{ backgroundImage: "url('/pixel-pattern.png')" }}
        >
            <div className="bg-[#223322] border-4 border-yellow-500 p-6 w-full max-w-md rounded-xl shadow-2xl">
                <div className="flex justify-center mb-4">
                    <Image src="/codeharvest-logo.png" alt="Logo" width={80} height={80} />
                </div>
                <h1 className="text-center text-yellow-300 text-2xl font-bold mb-6 pixel-font">Connexion</h1>
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
                                <label htmlFor="email" className="text-yellow-200 font-semibold text-sm">Email</label>
                                <Field name="email" type="email" as={PixelInput} />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-yellow-200 font-semibold text-sm">Mot de passe</label>
                                <Field name="password" type="password" as={PixelInput} />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            {authError && <div className="text-red-500 text-xs text-center font-bold">{authError}</div>}

                            <PixelButton type="submit" disabled={isSubmitting}>Se connecter</PixelButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
