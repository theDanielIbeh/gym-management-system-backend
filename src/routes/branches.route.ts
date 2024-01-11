import { Router } from 'express';
import { BranchController } from '@controllers/branches.controller';
import { AddStaffDto, AddUserDto, AssignBranchDto, CreateBranchDto } from '@dtos/branches.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { checkSuperAdminRole } from '@/middlewares/superadmin.middleware';

export class BranchRoute implements Routes {
  public path = '/branch';
  public router = Router();
  public branch = new BranchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, checkSuperAdminRole('Superadmin'), this.branch.getBranches);
    this.router.get(`${this.path}/:id`, checkSuperAdminRole('Superadmin'), this.branch.getBranchById);
    this.router.post(`${this.path}`, checkSuperAdminRole('Superadmin'), ValidationMiddleware(CreateBranchDto), this.branch.createBranch);
    this.router.put(
      `${this.path}/assign/:id`,
      checkSuperAdminRole('Superadmin'),
      ValidationMiddleware(AssignBranchDto),
      this.branch.updateBranchWithAdmin,
    );
    this.router.put(`${this.path}/add-staff/:id`, checkSuperAdminRole('Superadmin'), ValidationMiddleware(AddStaffDto), this.branch.addStaffToBranch);
    this.router.put(`${this.path}/add-user/:id`, checkSuperAdminRole('Superadmin'), ValidationMiddleware(AddUserDto), this.branch.addUserToBranch);
    this.router.put(`${this.path}/:id`, checkSuperAdminRole('Superadmin'), ValidationMiddleware(CreateBranchDto, true), this.branch.updateBranch);
    this.router.delete(`${this.path}/:id`, checkSuperAdminRole('Superadmin'), this.branch.deleteBranch);
  }
}
