import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Branch } from '@interfaces/branches.interface';
import { BranchService } from '@services/branches.service';
import { AddStaffDto, AddUserDto, AddInstructorDto, AssignBranchDto } from '@/dtos/branches.dto';

export class BranchController {
  public branch = Container.get(BranchService);

  public getBranches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBranchsData: Branch[] = await this.branch.findAllBranches();

      res.status(200).json({ data: findAllBranchsData, message: 'found All' });
    } catch (error) {
      next(error);
    }
  };

  public getBranchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const findOneBranchData: Branch = await this.branch.findBranchById(branchId);

      res.status(200).json({ data: findOneBranchData, message: 'found One' });
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

  public updateBranchWithAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const assignBranchDto: AssignBranchDto = req.body;
      const adminId: string = assignBranchDto.admin;

      const updateBranchData: Branch = await this.branch.assignAdminToBranch(branchId, adminId);

      res.status(200).json({ data: updateBranchData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public addStaffToBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const addStaffDto: AddStaffDto = req.body;
      const userId: string = addStaffDto.user_id;

      const updateBranchData: Branch = await this.branch.addStaffToBranch(branchId, userId);

      res.status(200).json({ data: updateBranchData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public addUserToBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const addUserDto: AddUserDto = req.body;
      const userId: string = addUserDto.user_id;

      const updateBranchData: Branch = await this.branch.addUserToBranch(branchId, userId);

      res.status(200).json({ data: updateBranchData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public addInstructorToBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const branchId: string = req.params.id;
      const addInstructorDto: AddInstructorDto = req.body;
      const userId: string = addInstructorDto.user_id;

      const updateBranchData: Branch = await this.branch.addInstructorToBranch(branchId, userId);

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
