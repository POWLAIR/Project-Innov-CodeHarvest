'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

interface FormValues {
    email: string;
    password: string;
}

const Signup = () => {
    const [signupError, setSignupError] = useState<string | null>(null);

    const initialValues: FormValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Email invalide').required('Requis'),
        password: Yup.string().min(6, 'Minimum 6 caractères').required('Requis'),
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
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

            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            localStorage.setItem('token', data.data.registerUser.token);
            window.location.href = '/';
        } catch (error) {
            if (error instanceof Error) {
                setSignupError(error.message);
            } else {
                setSignupError("Erreur inconnue lors de l'inscription");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-repeat"
            style={{ backgroundImage: "url('/pixel-pattern.png')" }}
        >
            <div className="bg-[#223322] border-[8px] border-yellow-600 p-6 sm:p-8 w-full max-w-md shadow-2xl rounded-lg">
                <div className="flex justify-center mb-4">
                    <Image src="/codeharvest-logo.png" alt="CodeHarvest" width={96} height={96} />
                </div>

                <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6 pixel-font tracking-widest">
                    Sign up
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="email" className="block text-yellow-200 text-sm mb-1 pixel-font">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full border-4 border-yellow-500 px-3 py-2 rounded-sm bg-yellow-100 text-black font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-yellow-200 text-sm mb-1 pixel-font">Mot de passe</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="w-full border-4 border-yellow-500 px-3 py-2 rounded-sm bg-yellow-100 text-black font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {signupError && <div className="text-red-500 text-center text-sm pixel-font">{signupError}</div>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-500 border-4 border-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded pixel-font uppercase transition"
                            >
                                S’inscrire
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
