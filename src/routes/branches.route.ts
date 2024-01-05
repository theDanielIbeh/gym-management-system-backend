import { Router } from 'express';
import { BranchController } from '@controllers/branches.controller';
import { CreateBranchDto } from '@dtos/branches.dto';
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
    this.router.get(`${this.path}`, this.branch.getBranches);
    this.router.get(`${this.path}/:id`, this.branch.getBranchById);
    this.router.post(`${this.path}`, checkSuperAdminRole('Superadmin'), ValidationMiddleware(CreateBranchDto), this.branch.createBranch);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateBranchDto, true), this.branch.updateBranch);
    this.router.delete(`${this.path}/:id`, this.branch.deleteBranch);
  }
}
