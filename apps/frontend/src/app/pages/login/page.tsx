'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
    const [authError, setAuthError] = useState<string | null>(null);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-semibold mb-4">Connexion</h1>

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
                      userId
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
                        window.location.href = '/';
                    } catch {
                        setAuthError('Erreur de connexion au serveur');
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className="w-full border rounded px-2 py-1" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <Field name="password" type="password" className="w-full border rounded px-2 py-1" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        {authError && <div className="text-red-600 text-sm">{authError}</div>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Connexion
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
