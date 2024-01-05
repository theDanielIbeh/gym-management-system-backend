import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Branch } from '@interfaces/branches.interface';
import { BranchService } from '@services/branches.service';

export class BranchController {
  public branch = Container.get(BranchService);

  public getBranches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBranchsData: Branch[] = await this.branch.findAllBranches();

      res.status(200).json({ data: findAllBranchsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBranchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const findOneBranchData: Branch = await this.branch.findBranchById(branchId);

      res.status(200).json({ data: findOneBranchData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchData: Branch = req.body;
      const createBranchData: Branch = await this.branch.createBranch(branchData);

      res.status(201).json({ data: createBranchData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const branchData: Branch = req.body;
      const updateBranchData: Branch = await this.branch.updateBranch(branchId, branchData);

      res.status(200).json({ data: updateBranchData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const deleteBranchData: Branch = await this.branch.deleteBranch(branchId);

      res.status(200).json({ data: deleteBranchData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
