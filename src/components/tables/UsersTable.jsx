import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { User, Edit, Trash2, Shield, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { userService } from '../../api/userService';
import { useToast } from '../../context/ToastContext';
import { Loader } from '../ui/Loader';

import { UserModal } from '../modals/UserModal';

const resolveId = (user) => user.userId || user.id || user._id;

export function UsersTable() {
    const { showToast } = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (user) => {
        const id = resolveId(user);
        if (!id) { alert('Cannot delete: user ID not found'); return; }
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await userService.deleteUser(id);
            setUsers(users.filter(u => resolveId(u) !== id));
            showToast('User deleted successfully');
        } catch (err) {
            alert('Failed to delete user: ' + err.message);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleEditSubmit = async (data) => {
        const id = resolveId(selectedUser);
        try {
            const updatedUser = await userService.updateUserProfile(id, data);

            // Merge changes back into local state
            setUsers(users.map(u => resolveId(u) === id ? { ...u, ...data, ...(updatedUser || {}) } : u));
            showToast('User profile updated successfully');
        } catch (err) {
            throw err; // UserModal will handle the alert
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="p-8 text-center text-danger font-medium bg-danger-soft rounded-2xl border border-danger-200">{error}</div>;

    return (
        <div className="flex flex-col">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={resolveId(user)}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <User className="w-4 h-4 text-accent" />
                                    {user.name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-primary-600">
                                        <Mail className="w-3 h-3" />
                                        {user.email}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={(user.accountType === 'ADMIN' || user.role === 'Admin') ? 'success' : 'default'}>
                                        {user.accountType || user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditClick(user)}
                                            title="Edit Profile"
                                        >
                                            <Edit className="w-4 h-4 text-primary-600" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(user)}
                                            className="text-danger hover:bg-danger-soft"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                onSubmit={handleEditSubmit}
                user={selectedUser}
            />
        </div>
    );
}
