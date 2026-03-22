import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function RuleEngineTable({ rules }) {
    return (
        <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rule Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell className="font-medium text-primary-900">{rule.name}</TableCell>
                            <TableCell className="text-primary-600">{rule.category}</TableCell>
                            <TableCell>
                                <Badge variant={rule.status === 'Active' ? 'success' : 'default'}>
                                    {rule.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {rules.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No rules configured.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
