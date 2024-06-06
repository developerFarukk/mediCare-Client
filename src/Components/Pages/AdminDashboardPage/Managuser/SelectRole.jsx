
import PropTypes from 'prop-types'
import UpdateUserModal from '../../../../Components/Modal/UpdateUserModal'
import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/UseAuth/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';


const SelectRole = ({ user, refetch }) => {

    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user: loggedInUser } = useAuth();


    const { mutateAsync } = useMutation({
        mutationFn: async role => {
            const { data } = await axiosSecure.patch(`/users/roles/${user?.email}`, role)
            return data
        },
        onSuccess: data => {
            refetch()
            console.log(data)
            if (data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: ` Role chenged Successful`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setIsOpen(false)
        },
    })

    //   modal handler button
    const modalHandler = async selected => {
        if (loggedInUser.email === user.email) {
            toast.error('Action Not Allowed')
            return setIsOpen(false)
        }

        const userRole = {
            role: selected
        }

        try {
            await mutateAsync(userRole)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
                <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                ></span>
                <span className='relative'>Update Role</span>
            </button>
            {/* Update User Modal */}
            <UpdateUserModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalHandler={modalHandler}
                user={user}
            />
        </>
    );
};

SelectRole.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func,
}

export default SelectRole;