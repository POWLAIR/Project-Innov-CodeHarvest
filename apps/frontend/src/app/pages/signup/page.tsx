'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
    email: string;
    password: string;
}

const Signup = () => {
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
                alert(error.message);
            } else {
                alert("Erreur inconnue lors de l'inscription");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <label>Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />

                <label>Mot de passe</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" />

                <button type="submit">S&apos;inscrire</button>
            </Form>
        </Formik>
    );
};

export default Signup;
