import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import Wrapper from "../../components/Wrapper.jsx";
import Button from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";
import useUsers from "../../hooks/useUsers.js";

const userSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required'),
    lastName: z.string().trim().optional(),
    email: z.string().trim().email('Invalid email address'),
    dateOfBirth: z.string().date("Date must be in mm/dd/yyyy format"),
    status: z.enum(['active', 'locked'], { errorMap: () => ({ message: 'Status is required' }) }),
});

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {createUserMutation, getUserQuery, editUserMutation} = useUsers(id);
    const {data} = getUserQuery

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            status: '',
        }
    });

    useEffect(() => {
        if(data) {
            reset({
                firstName: data?.firstName || '',
                lastName: data?.lastName || '',
                email: data?.email || '',
                dateOfBirth: data?.dateOfBirth || '',
                status: data?.status || '',
            })
        }
    }, [data,reset]);

    const goToDashboard = () => {
        navigate('/dashboard')
    }

    const isPendingForm = createUserMutation.isPending || editUserMutation.isPending

    return (
        <Wrapper hideSearchUser={true} primaryLabel={'All users'} onPrimaryClick={goToDashboard}>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold text-center mb-6">
                        {id ? 'Edit User' : 'Add New User'}
                    </h2>

                    <form onSubmit={id ? handleSubmit(editUserMutation.mutate) : handleSubmit(createUserMutation.mutate)} className="space-y-4">
                        <Input label={'First Name'} error={errors?.firstName?.message} {...register('firstName')} />
                        <Input label={'Last Name (Optional)'} {...register('lastName')} />
                        <Input label={'Email'} error={errors?.email?.message} {...register('email')} />
                        <Input
                            label={'Date of Birth'}
                            error={errors?.dateOfBirth?.message}
                            type={'date'}
                            placeholder={'mm/dd/yyyy'}
                            {...register('dateOfBirth')}
                        />

                        <div>
                            <label className="user-label">Status</label>
                            <select {...register('status')} className="user-input">
                                <option value="">Select status</option>
                                <option value="active">Active</option>
                                <option value="locked">Locked</option>
                            </select>
                            {errors.status && <p className="user-input-error">{errors.status.message}</p>}
                        </div>

                        <div className="flex justify-center mt-4">
                            <Button
                                title={isPendingForm ? 'Submitting...' : 'Submit'}
                                type="submit"
                                disabled={isPendingForm}
                                className="disabled:opacity-50"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

export default UserForm;