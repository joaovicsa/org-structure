import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, User, Users, Building, Trash2 } from 'lucide-react';

interface OrgSidebarProps {
  selectedNode: Node | null;
  onAddPerson: (data: { name: string; role: string; department: string; level: 'ceo' | 'manager' | 'employee' }) => void;
  onUpdatePerson: (nodeId: string, data: { name: string; role: string; department: string; level: 'ceo' | 'manager' | 'employee' }) => void;
  onDeletePerson: (nodeId: string) => void;
  onCancel: () => void;
}

export const OrgSidebar: React.FC<OrgSidebarProps> = ({
  selectedNode,
  onAddPerson,
  onUpdatePerson,
  onDeletePerson,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    level: 'employee' as 'ceo' | 'manager' | 'employee',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      const nodeData = selectedNode.data as any;
      setFormData({
        name: nodeData.name || '',
        role: nodeData.role || '',
        department: nodeData.department || '',
        level: nodeData.level || 'employee',
      });
      setIsEditing(true);
    } else {
      setFormData({
        name: '',
        role: '',
        department: '',
        level: 'employee',
      });
      setIsEditing(false);
    }
  }, [selectedNode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.department.trim()) return;

    if (isEditing && selectedNode) {
      onUpdatePerson(selectedNode.id, formData);
    } else {
      onAddPerson(formData);
    }

    setFormData({
      name: '',
      role: '',
      department: '',
      level: 'employee',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      role: '',
      department: '',
      level: 'employee',
    });
    setIsEditing(false);
    onCancel();
  };

  const handleDelete = () => {
    if (selectedNode) {
      onDeletePerson(selectedNode.id);
    }
  };

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Product',
  ];

  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Organization</h2>
          <p className="text-muted-foreground text-sm">
            Manage your organizational structure
          </p>
        </div>

        <Separator />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">CEO</p>
                <p className="text-sm font-semibold">1</p>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Managers</p>
                <p className="text-sm font-semibold">3</p>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Staff</p>
                <p className="text-sm font-semibold">8</p>
              </div>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {isEditing ? 'Edit Person' : 'Add Person'}
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update person details' : 'Add a new person to the organization'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Developer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value as 'ceo' | 'manager' | 'employee' })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="w-3 h-3 p-0"></Badge>
                        CEO
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="w-3 h-3 p-0"></Badge>
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="employee">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-3 h-3 p-0"></Badge>
                        Employee
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">
                  {isEditing ? 'Update' : 'Add Person'}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {isEditing && selectedNode && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Person
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};