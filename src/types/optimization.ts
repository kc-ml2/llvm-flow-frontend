export interface OptimizationRecord {
  id: string
  user_name: string
  opt_passes: string[]
  llvm_version: string
  file_names: string[]
  created_at: Date
}
