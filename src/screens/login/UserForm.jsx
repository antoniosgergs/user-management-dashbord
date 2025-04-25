import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in mm/dd/yyyy format'),
    status: z.enum(['active', 'locked'], { errorMap: () => ({ message: 'Status is required' }) }),
});

const UserForm = ({ onSubmit, defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add New User</h2>
            <div>
                <label>First Name</label>
                <input {...register('firstName')} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div>
                <label>Last Name (Optional)</label>
                <input {...register('lastName')} />
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Date of Birth (mm/dd/yyyy)</label>
                <input {...register('dateOfBirth')} />
                {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
            </div>
            <div>
                <label>Status</label>
                <select {...register('status')}>
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                </select>
                {errors.status && <p>{errors.status.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;