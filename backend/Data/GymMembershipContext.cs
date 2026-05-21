using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GymMembershipAPI.Models;

namespace GymMembershipAPI.Data
{
    public class GymMembershipContext : IdentityDbContext<IdentityUser>
    {
        public GymMembershipContext(DbContextOptions<GymMembershipContext> options) 
            : base(options)
        {
        }

        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<GymMembership> GymMemberships { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Health> HealthRecords { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Trainer configuration
            modelBuilder.Entity<Trainer>()
                .HasKey(t => t.TrainerId);

            modelBuilder.Entity<Trainer>()
                .HasMany(t => t.Appointments)
                .WithOne(a => a.Trainer)
                .HasForeignKey(a => a.TrainerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Trainer>()
                .HasMany(t => t.Members)
                .WithOne(m => m.Trainer)
                .HasForeignKey(m => m.TrainerId)
                .OnDelete(DeleteBehavior.SetNull);

            // Member configuration
            modelBuilder.Entity<Member>()
                .HasKey(m => m.MemberId);

            modelBuilder.Entity<Member>()
                .HasMany(m => m.Appointments)
                .WithOne(a => a.Member)
                .HasForeignKey(a => a.MemberId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Member>()
                .HasMany(m => m.HealthRecords)
                .WithOne(h => h.Member)
                .HasForeignKey(h => h.MId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Member>()
                .HasOne(m => m.Subscription)
                .WithOne(s => s.Member)
                .HasForeignKey<GymMembership>(s => s.MemberId)
                .OnDelete(DeleteBehavior.Cascade);

            // Appointment configuration
            modelBuilder.Entity<Appointment>()
                .HasKey(a => a.AId);

            // Schedule configuration
            modelBuilder.Entity<Schedule>()
                .HasKey(s => s.SId);

            modelBuilder.Entity<Schedule>()
                .HasMany(s => s.Exercises)
                .WithMany(e => e.Schedules)
                .UsingEntity("ScheduleExercises");

            // Health configuration
            modelBuilder.Entity<Health>()
                .HasKey(h => h.HId);

            // Exercise configuration
            modelBuilder.Entity<Exercise>()
                .HasKey(e => e.EId);

            // Attendance configuration
            modelBuilder.Entity<Attendance>()
                .HasKey(a => a.AttendanceId);

            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Member)
                .WithMany()
                .HasForeignKey(a => a.MemberId)
                .OnDelete(DeleteBehavior.Cascade);

            // Message configuration
            modelBuilder.Entity<Message>()
                .HasKey(m => m.MessageId);

            // Payment configuration
            modelBuilder.Entity<Payment>()
                .HasKey(p => p.PaymentId);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Subscription)
                .WithMany()
                .HasForeignKey(p => p.SubscriptionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Add indexes for better query performance
            modelBuilder.Entity<Member>()
                .HasIndex(m => m.Email)
                .IsUnique();

            modelBuilder.Entity<Trainer>()
                .HasIndex(t => t.Email)
                .IsUnique();

            modelBuilder.Entity<GymMembership>()
                .HasIndex(s => s.MemberId)
                .IsUnique();
        }
    }
}
