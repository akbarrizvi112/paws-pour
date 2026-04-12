import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { User, Edit, Trash2, Shield, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { userService } from '../../api/userService';

export function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(u => u.id !== userId));
        } catch (err) {
            alert('Failed to delete user: ' + err.message);
        }
    };

    const handleToggleRole = async (user) => {
        const newRole = user.role === 'Admin' ? 'User' : 'Admin';
        try {
            await userService.updateUserProfile(user.id, { role: newRole });
            setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Failed to update user: ' + err.message);
        }
    };

    if (loading) return <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div>;
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
                            <TableRow key={user.id}>
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
                                    <Badge variant={user.role === 'Admin' ? 'success' : 'default'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleRole(user)}
                                            title="Toggle Role"
                                        >
                                            <Shield className="w-4 h-4 text-primary-600" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
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
        </div>
    );
}
